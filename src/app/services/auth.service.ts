import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IAuth, ITokens} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {urls} from "../constans";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _accessTokenKey = 'access';
  private readonly _refreshTokenKey = 'refresh';

  private authUser = new BehaviorSubject<IAuth>(null);

  constructor(private httpClient:HttpClient) { }

   login(user:IAuth):Observable<ITokens>{
      return this.httpClient.post<ITokens>(urls.auth.login, user).pipe(
        tap(tokens=>this._setTokens(tokens))
    )
  }

  refresh():Observable<ITokens>{
    return  this.httpClient.post<ITokens>(urls.auth.refresh,{refresh:this.getRefreshToken()}).pipe(
        tap(tokens=>this._setTokens(tokens))
    )
  }

  myData():Observable<IAuth>{
    return this.httpClient.get<IAuth>(urls.auth.myData).pipe(
      tap(user=>this.authUser.next(user))
    )
  }
  getAuthUser():Observable<IAuth>{
    return this.authUser.asObservable();
  }

  setAuthUser(data:IAuth):void{
    this.authUser.next(data)
  }

  private _setTokens({refresh,access}:ITokens):void{
    localStorage.setItem(this._accessTokenKey, access);
    localStorage.setItem(this._refreshTokenKey, refresh);
  }

  getAccessToken():string{
    return localStorage.getItem(this._accessTokenKey)
  }

  getRefreshToken():string{
    return localStorage.getItem(this._refreshTokenKey)
  }

  deleteTokens():void{
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
  }
}
