import http from './httpService';



// exporting teh functionn taht will call the back end services.
export function getGenres() {
    // calling the get request from http
    // base URL of the api + the endpoint.
    return http.get('/genres');
  }
  