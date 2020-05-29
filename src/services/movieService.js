import http from "./httpService.js";
import {apiUrl} from "../config.json"

const apiEndpoint = apiUrl + '/movies';

// code refactoring
 function MovieUrl(id){
    // template literls referringt to the objectt o be rendered dynamically.
    return `${apiEndpoint}/${id}`;
}

export function getMovies(){
    return http.get(apiEndpoint)
}

export function getMovie(movieId){
    return http.get(MovieUrl(movieId));
}

// create a movie or updte it.
export function saveMovie(movie){
    // if movie exits //update
    if (movie._id){
        // avoid updating state directly
        const body = {...movie}
        delete body._id;
        return http.put(MovieUrl(movie._id), body)
    }
    // creting movie
  return http.post(apiEndpoint, movie);

}

export function deleteMovie(movieId){
return http.delete(MovieUrl(movieId));
}