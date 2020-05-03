import React, { Component } from 'react';
import Input  from "./common/input";

class LoginForm extends Component {

   

    state = {
        account: { username: '', password: ''},
        errors: {}
    };

    validate=()=>{
       const errors ={};

       const {account} = this.state;
        // Removes white space from either side of a string
       if(account.username.trim() === '')
        errors.username = 'Username is required';
        if(account.password.trim() === '')
        errors.password = 'Password is required';
        
        // return an array of all the keys n the errrors object
       return Object.keys(errors).length === 0 ? null : errors;
    }


    handleSubmit = e =>{
        // doesnt reload th whole page
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {} });
        // if we do have errors wont call server
        if (errors) return;

        // call the server 
       
        console.log("submitted")
    }

    // currentTarget : input pointing to the input element.
    handleChange = ({ currentTarget: input}) =>{
        // clone the state object - cant mutate state directly.
       const account = {...this.state.account}
    //    grabbing the value input of the input element.
       account[input.name] = input.value;
    //    bringing the state up to date
       this.setState({account});
    }

    render() { 
        const {account, errors} = this.state

        return ( <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              <Input
              name ="username"
              value = {account.username}
              label="Username"
              onChange={this.handleChange}
              error={errors.username}
              />
              <Input
              name ="password"
              value = {account.password}
              label="Password"
              onChange={this.handleChange}
              error={errors.password}
              />
               
                <button  className="btn btn-primary">Login</button>
            </form>
            </div>
            
         );
    }
}
 
export default LoginForm;