import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With,Origin,Accept',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Credentials':'true',
    'Content-Type': 'application/json',
    'Password': '1234',
    'App': 'APP_BCK',
    'Origen': 'https://dev.tuten.cl',
    'X-Host-Override': 'dev.tuten.cl',
    'Accept': 'application/json'
  }) };

  constructor(private http: HttpClient) { }

  //HttpMethods
  boolean:Boolean;
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(parametros) {
    const httpHeaders= new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With,Origin,Accept',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials':'true',
      'Content-Type': 'application/json',
      'Password': parametros.password,
      'App': 'APP_BCK',
      'Origen': 'https://dev.tuten.cl',
      'X-Host-Override': 'dev.tuten.cl',
      'Accept': 'application/json'
    }) ;
    console.log('parametros ',parametros)
    return this.http.put("https://dev.tuten.cl/TutenREST/rest/user/"+parametros.email,"",{headers:httpHeaders});
  }

  listBooking(parametros) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      // 'Authorization': 'Bearer ' + this.sesion.token,
      'token':parametros.token,
      'adminemail':'testapis@tuten.cl',
      'Origen':'https://dev.tuten.cl',
      'X-Host-Override':'dev.tuten.cl',
      'Accept':'application/json',
      'App':'APP_BCK'
    }); 
    return this.http.get("https://dev.tuten.cl/TutenREST/rest/user/contacto@tuten.cl//bookings?current=true",{headers:httpHeaders});
  }


  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  //Helper Methods

  setToken(token: string) {
    if (token!="") {
      localStorage.setItem('token', token);
      this.boolean=true
      
    }else{
      this.boolean=false
    }
    this.isLoggedIn()
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    // var token = this.getToken();
    // console.log(' token s',token)
    // if (token) {
    //   var userPayload = atob(token.split('.')[1]);
    //   return JSON.parse(userPayload);
    // }
    // else
    //   return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    // if (userPayload)
    //   return userPayload.exp > Date.now() / 1000;
    // else
     return this.boolean;
  }
}
