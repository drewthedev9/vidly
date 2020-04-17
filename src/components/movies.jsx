import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Moviestable from '../components/moviesTable'
import Listgroup from './common/listGroup'
import Pagination from './common/pagination'
import { paginate} from '../utils/paginate'
import {getGenres} from '../services/fakeGenreService'

class Movies extends Component {
    state = {
     movies: [],
     genres: [],
     currentPage: 1,
     pageSize: 4.
      };

    //   gets the data from server or pur files
      componentDidMount (){
            const genres = [{_id:"",name: 'All genres'},...getGenres()]
            this.setState({ movies: getMovies(), genres})
      }

    //   arrow function will allow for the acces to the object and function above
      handleDelete=(movie)=>{
        //   want to return all of the movies except the deleted one
        // with filter method.
          const movies = this.state.movies.filter(m => m._id !== movie._id);
        //   overides state: movies /w the const movies.
            this.setState({movies: movies});
      }

      handlePageChange =(page)=>{
          this.setState({ currentPage : page})
      }

      handleGenreSelect = genre =>{
          this.setState({ selectedGenre: genre, currentPage: 1})
      }

      handleSort = column =>{
            this.setState({ sortColumn:{path, order:'asc'}})
      }

      handleLike = (movie) =>{
       const movies = [...this.state.movies];
       const index = movies.indexOf(movie);
       movies[index] = { ...movies[index]};
       movies[index].liked = !movies[index].liked;
       this.setState({ movies});
      };
    
    render() { 
        const { length: count } = this.state.movies;
        const {pageSize, currentPage, selectedGenre, movies:allMovies} = this.state;

        if (this.state.movies.length === 0) 
            return <p>There are no movies in the database.</p>

            const filtered = selectedGenre && selectedGenre._id
             ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;
            const movies = paginate(filtered, currentPage, pageSize);
        
        return (
            
           
            <div className="row">
                <div className="col-3">
                    <Listgroup
                    items= {this.state.genres}
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                <p> Showing {filtered.length} movies in the database.</p>
               <Moviestable
               movies ={movies}
               onLike={this.handleLike}
               onDelete={this.handleDelete}
               onSort={this.handleSort}
               />
                <Pagination 
                itemsCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
                />
        </div>
        </div>
        );
    }
}
 
export default Movies;