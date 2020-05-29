// third part libraries
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
// components
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";

// services
import auth from './services/authService';
// csss modules
import "./App.css";


class App extends Component {
  state ={};

  componentDidMount(){
      const user = auth.getCurrentUser();
      this.setState({user});
  }
  render() {
    const {user} = this.state
    return (
      <React.Fragment>
        <NavBar user={user}/>
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />

            <Route path="/movies"
            //passing props to this child component needs render with routing. 
            // ..props is for injecting histroy and props for this.
            // add user object to the movies component.
             render={props => <Movies {...props} user={user}/>
           } />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
