import React from 'react';
import { NavLink } from 'react-router-dom';


const NewMovieBtn = () => {
    return ( 
<NavLink className="btn btn-primary" to="/newmovie">
NewMovie
</NavLink>
        

     );
}
 
export default NewMovieBtn;