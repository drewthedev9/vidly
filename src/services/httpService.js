import axios from "axios";
import logger from "./logService";




// here we make get the get, put,post, delete requests 
// axios.
// Global handling for unexpected errors.
axios.interceptors.response.use(null, error =>{
    const expectedError = error.response && 
    error.response.status >= 400 && error.response.status < 500;
    
      if(!expectedError){
         // logging the exception error.
        logger.log(error);
         console.log('Logging the error', error);
         alert('an unexpected error occured');
    
      }
      return Promise.reject(error);
       
    });

    function setJwt(jwt){

      //can set different kinds of headers on all repqust
// loke get, post etc. 
axios.defaults.headers.common['x-auth-token'] = jwt;
    }

    // exporting a default object conrainig teh axios libray methods
    // for using http service.
    export default {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      delete: axios.delete,
      setJwt
    };