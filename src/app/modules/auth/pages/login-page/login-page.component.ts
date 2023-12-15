import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {LoginComponent} from "../../components/login/login.component";

@Component({
  selector: 'app-login-page',
  template:''
})
export class LoginPageComponent {
    constructor(private matDialog:MatDialog) {
      this.matDialog.open(LoginComponent,
        {
          hasBackdrop:false,
          disableClose:true,
          enterAnimationDuration:'1s',
          exitAnimationDuration:'1s'
        })
    }
}
