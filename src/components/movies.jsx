import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';

class Movies extends Component {
    state = {
     movies: getMovies()
      };

    //   arrow function will allow for the acces to the object and function above
      handleDelete=(movie)=>{
        //   want to return all of the movies except the deleted one
        // with filter method.
          const movies = this.state.movies.filter(m => m._id !== movie._id);
        //   overides state: movies /w the const movies.
            this.setState({movies: movies});
      }
    render() { 
        if (this.state.movies.length === 0) 
            return <p>There are no movies in the database.</p>
        
        return (
            
        
        <table className ='table'>
        <p> showing {this.movie.state.lenght} movies showing in the database.</p>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {this.state.movies.map(movie => 
            <tr key={movie._id} >
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><button onClick={()=>this.handleDelete(movie)}className = "btn btn-danger btn-sm">Delete</button></td>
            </tr>)}
                
            </tbody>
       </table>
        );
    }
}
 
export default Movies;