import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Moviestable from '../components/moviesTable'
import Listgroup from './common/listGroup'
import Pagination from './common/pagination'
import { paginate} from '../utils/paginate'
import _ from 'lodash';
import {getGenres} from '../services/fakeGenreService'

class Movies extends Component {
    state = {
     movies: [],
     genres: [],
     currentPage: 1,
     pageSize: 4,
     sortColumn: {path: 'title', order: 'asc'}
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

      handleSort = sortColumn =>{
          this.setState({ sortColumn});
      }

      handleLike = (movie) =>{
       const movies = [...this.state.movies];
       const index = movies.indexOf(movie);
       movies[index] = { ...movies[index]};
       movies[index].liked = !movies[index].liked;
       this.setState({ movies});
      };

      getPageData =() => {

        const {pageSize,
          currentPage, 
          selectedGenre,
          sortColumn,
          movies:allMovies} = this.state;

        const filtered = selectedGenre && selectedGenre._id
             ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;

           const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

            const movies = paginate(sorted, currentPage, pageSize);

            return {totalCount: filtered.length, data:movies}
      }
    
    render() { 
        const { length: count } = this.state.movies;
        const {pageSize,
          currentPage, 
          sortColumn,
           } = this.state;

        if (count === 0) 
            return <p>There are no movies in the database.</p>

            const {totalCount, data: movies} = this.getPageData();
        
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
                <p> Showing {totalCount} movies in the database.</p>
               <Moviestable
               movies ={movies}
               sortColumn={sortColumn}
               onLike={this.handleLike}
               onDelete={this.handleDelete}
               onSort={this.handleSort}
               />
                <Pagination 
                itemsCount={totalCount}
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