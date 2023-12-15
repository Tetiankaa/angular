import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import {Router} from "@angular/router";

import {AuthService} from "./services";
import {urls} from "./constants";

@Injectable()
export class MainInterceptor implements HttpInterceptor{
  isRefreshing = false;
  waitRefreshListSubject = new BehaviorSubject<string>(null)
  constructor(private authService:AuthService, private router:Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken){
      req = this._addToken(req,accessToken)

    }
    return next.handle(req).pipe(
      catchError((res:HttpErrorResponse):any=>{
        if (res && res.error && res.status === 401){
          const refreshToken = this.authService.getRefreshToken();

          if (!this.isRefreshing && refreshToken){
            return this._handle404Error(req, next)
          }

          if (req.url === urls.auth.refresh){
            this.isRefreshing = false;
            this.authService.deleteTokens();
            this.router.navigate(['auth','login'],{queryParams:{sessionExpire:true}})
            return throwError(()=>res)
          }

          return this.waitRefreshListSubject.pipe(
            filter(token=>token !== null),
            take(1),
            switchMap(token=>next.handle(this._addToken(req,token)))
          )
        }
      })
    )
  }

  _addToken(req:HttpRequest<any>,token:string):HttpRequest<any>{
    return req.clone(
      {
        setHeaders:{Authorization:`Bearer ${token}`}
      }
    )
  }
  _handle404Error(req:HttpRequest<any>, next:HttpHandler):any{
    this.isRefreshing = true;

    return this.authService.refresh().pipe(
      switchMap(({access})=>{
        this.isRefreshing = false;
        this.waitRefreshListSubject.next(access);
       return  next.handle(this._addToken(req,access))
      })
    )
  }

}
