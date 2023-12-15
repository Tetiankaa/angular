import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IAuth, ITokens, IUser} from "../interfaces";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly _accessTokenKey = 'access';
 private readonly _refreshTokenKey = 'refresh';
 myDataSubject = new BehaviorSubject<IUser>(null);

  constructor(private httpClient:HttpClient) { }


  register(userData:IAuth):Observable<IUser>{
   return  this.httpClient.post<IUser>(urls.auth.register, userData)
  }
  login(userData:IAuth):Observable<ITokens>{
    return this.httpClient.post<ITokens>(urls.auth.login, userData).pipe(
      tap(tokens=>this.setTokens(tokens))
    )
  }
  getMyData():Observable<IUser>{
    return this.httpClient.get<IUser>(urls.auth.myData)
  }

  refresh():Observable<ITokens>{
    return this.httpClient.post<ITokens>(urls.auth.refresh,{refresh:this.getRefreshToken()}).pipe(
      tap(tokens=>this.setTokens(tokens))
    )
  }
  setTokens({access,refresh}:ITokens):void{
    localStorage.setItem(this._accessTokenKey,access);
    localStorage.setItem(this._refreshTokenKey, refresh);
  }

  getAccessToken():string{
    return localStorage.getItem(this._accessTokenKey);
  }
  getRefreshToken():string{
    return localStorage.getItem(this._refreshTokenKey);
  }

  deleteTokens():void{
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
  }

  getMyDataSubject():Observable<IUser>{
    return this.myDataSubject.asObservable();
  }

  setMyDataSubject(data:IUser):void{
    this.myDataSubject.next(data)
  }

}
