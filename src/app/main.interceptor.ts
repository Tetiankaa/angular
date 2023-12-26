import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import {AuthService} from "./services";
import {urls} from "./constants";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class MainInterceptor implements HttpInterceptor{
  private refreshing = false;
  private waitRefreshListSubject = new BehaviorSubject<string>(null);

  constructor(private authService:AuthService, private router:Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
      const access = this.authService.getAccessToken();

      if (access){
        req = this.addToken(req,access)
      }
     return  next.handle(req).pipe(
        catchError((err:HttpErrorResponse)=>{
          if (err && err.error && err.status === 401){
            const refreshToken = this.authService.getRefreshToken();

            if (!this.refreshing && refreshToken){
              return this.handle401Error(req,next);
            }
            if (err.url === urls.auth.refresh){
              this.refreshing=false;
              this.authService.deleteTokens();
              this.router.navigate(['auth','login'],{queryParams:{sessionExpired:true}});
              return throwError(()=>err);
            }

            return this.waitRefreshListSubject.pipe(
              filter(token=>token!==null),
              take(1),
              switchMap(token=>{
                return next.handle(this.addToken(req, token))
              })
            )
          }
        })
      )

  }

 private addToken(req: HttpRequest<any>, token:string):HttpRequest<any>{
    return req.clone({
      setHeaders:{Authorization:`Bearer ${token}`}
      }
    )
  }

  private handle401Error(req: HttpRequest<any>,next: HttpHandler):any{
    this.refreshing = true;

   return this.authService.refresh().pipe(
     switchMap(({access})=>{
       this.refreshing = false;
       this.waitRefreshListSubject.next(access);
       return next.handle(this.addToken(req, access))
     })
   )
  }

}
