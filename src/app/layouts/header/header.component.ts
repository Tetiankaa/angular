import {Component} from '@angular/core';
import {AuthService} from "../../services";
import {IUser} from "../../interfaces";
import {disableVersionCheck} from "@angular/cli/src/utilities/environment-options";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  userData:IUser

  constructor(private authService:AuthService) {
   this.authService.getMyDataSubject().subscribe(value => {
     this.userData = value

     const token = this.authService.getAccessToken();

     if (token && !this.userData){
       this.authService.getMyData().subscribe(value=> this.userData = value)
     }
   })

  }

  logOut() {
    this.authService.deleteTokens();
    this.authService.setMyDataSubject(null);
  }
}
