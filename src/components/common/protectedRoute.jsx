import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from "../../services/authService.js"

const protecedRoutes = ({path, component : Component}, render, ...rest) => {
    return ( 
        <Route
        path={path}
        // add all the props  from above and any oher additional properties.
        {...rest}
        render={ props =>{
          if (!auth.getCurrentUser())return <Redirect to={{
            pathname: '/login',
            // represents the current location before we redirect them to
            // login page.
            state:{from: props.location}
          }}/>
          return Component? <Component{...props}/> : render(props);
        }} 
        />

     );
}
 
export default protecedRoutes;