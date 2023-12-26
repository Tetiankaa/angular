import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  username:string;

  constructor(private authService:AuthService, private router:Router) {}
  ngOnInit(): void {
    this.authService.getAuthUser().subscribe(value => {
      if (value){
        this.username = value.username;
      }

    })

    const accessToken = this.authService.getAccessToken();
        if (accessToken && !this.username){
          this.authService.getUserData().subscribe(value => {
            if (value){
              this.username = value.username;
            }
    })
  }
  }

  logOut() {
    this.authService.deleteTokens();
    this.authService.setAuthUser(null);
    this.username=null;
    this.router.navigate(['auth','login']);
  }
}
