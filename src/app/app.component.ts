import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  template:'<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(private matDialog:MatDialog, private router:Router) {
        this.router.events.pipe(filter(event=>event instanceof NavigationStart)).subscribe(()=>{
             this.matDialog.closeAll()
})
  }
}
