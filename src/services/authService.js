import jwtDecode from 'jwt-decode';
import http from "./httpService.js";




const apiEndpoint = '/auth';
const tokenKey ="token";

// calls the jswt function in httpService.
 http.setJwt(getJwt());

export async function login(email, password){
  const {data:jwt} =  await http.post(apiEndpoint,{email, password});
   //   localstorage is in the browse database. under application in browser.
        // 'tokenkey' is a string because data.username and data.password are strings.
  localStorage.setItem(tokenKey,jwt);
                        
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey,jwt);
}

export function getCurrentUser(){
    try{
        // get the jwt from srtorage.
     const jwt = localStorage.getItem(tokenKey);
     // then pass it tobe decoded.
     return jwtDecode(jwt);
     
 
     } catch(ex){
        return null;
     }
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

// default object exports all of these functions.
export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
};