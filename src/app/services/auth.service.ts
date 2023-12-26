import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuth, ITokens, IUser} from "../interfaces";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly refreshToken = 'refresh';
  private readonly accessToken = 'access';

  authUser = new BehaviorSubject<IUser>(null);

  constructor(private httpClient:HttpClient) { }

  register(userData:IAuth):Observable<IUser>{
    return this.httpClient.post<IUser>(urls.auth.register,userData)
  }
  login(userData:IAuth):Observable<ITokens>{
    return this.httpClient.post<ITokens>(urls.auth.login,userData).pipe(
      tap(tokens=> {
        this.setTokens(tokens);
      })
    )
  }
  refresh():Observable<ITokens>{
    const refresh = this.getRefreshToken();

    return this.httpClient.post<ITokens>(urls.auth.refresh,{refresh}).pipe(
      tap(tokens=>this.setTokens(tokens))
    )
  }
  getUserData():Observable<IUser>{
    return this.httpClient.get<IUser>(urls.auth.getUserData).pipe(
      tap(user=>this.authUser.next(user))
    );
  }

  getAuthUser():Observable<IUser>{
    return this.authUser.asObservable();
  }

  setAuthUser(userData:IUser):void{
    this.authUser.next(userData);
  }

  getAccessToken():string{
    return localStorage.getItem(this.accessToken)
  }
  getRefreshToken():string{
    return localStorage.getItem(this.refreshToken)
  }
  deleteTokens():void{
    localStorage.removeItem(this.refreshToken);
    localStorage.removeItem(this.accessToken);
  }
  setTokens({refresh,access}:ITokens):void{
    localStorage.setItem(this.accessToken,access);
    localStorage.setItem(this.refreshToken,refresh);
  }
}
