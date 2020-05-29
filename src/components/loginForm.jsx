import React from 'react';
import Joi from "joi-browser";
import Form from "./common/form"
import auth from "../services/authService";
import { Redirect } from 'react-router';


class LoginForm extends Form {

   

    state = {
        data: { username: '', password: ''},
        errors: {}
    };

    // Used to validate objexts ins state in validate function below.
    schema = { 
        username: Joi.string()
        .required()
        .label("Username"),
        password: Joi.string()
        .required()
        .label("Username")
    
    };


    doSubmit= async()=>{
        try{
        const {data} = this.state
       await auth.login(data.username, data.password);
        
       const {state} =this.props.location;
       window.location = state ? state.from.pathname : "/"; 
        
        //   console.log(jwt);
        // takes bak to home page from router, props .has history object
        // full reload of the application.
        window.location = '/';
        }catch(ex){
            if(ex.response && ex.response.status === 400){
                const errors ={...this.state.errors};
                // display the error we get from the server.
                errors.username = ex.response.data;
                // update the state with current errors object
                this.setState({errors})

            }
        }
    }

    render() { 
        if (auth.getCurrentUser()) return <Redirect to="/"/>;
       return ( <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', "password")}
            {this.renderButton("Login")}
            </form>
            </div>
            
         );
    }
}
 
export default LoginForm;