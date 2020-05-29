import React from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
// * as userService = all functions.
import * as userService from "../services/userService";
import auth from '../services/authService';


class RegisterForm extends Form {

    state = {
        data: { username: '', password: '',name: ''},
        errors: {}
    };

    // Used to validate objexts ins state in validate function below. for the inputs validating.
    schema = { 
        username: Joi.string()
        .required()
        .label("Username"),
        password: Joi.string()
        .required()
        // function at least 5 charecters.
        .min(5)
        .label("Password"),
        name:Joi.string()
        .required()
    
    };

    doSubmit= async()=>{
        try{
            const response = await userService.register(this.state.data);
            // storing the jwt from the custom header we enabled.
            auth.loginWithJwt(response.headers['x-auth-token']);
            // redirect user to the home page
            window.location = "/";
            // console.log(response);
        }catch(ex){
            if (ex.response && ex.response.status === 400);
            // clone the errors object
            const errors = {...this.state.errors};
            // set errors.username objnect to repsonse error.
            errors.username = ex.response.data
            // then call the new state
            this.setState({ errors});

        }
       
        
    }

    render() { 
       return ( <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', "password")}
            {this.renderInput('name', 'Name')}
            {this.renderButton("Register")}
            </form>
            </div>
            
         );
    }
}
 
export default RegisterForm;