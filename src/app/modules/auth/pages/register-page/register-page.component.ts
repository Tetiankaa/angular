import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../components/register/register.component";

@Component({
  selector: 'app-register-page',
 template:''
})
export class RegisterPageComponent {
  constructor(private matDialog:MatDialog) {
    this.matDialog.open(RegisterComponent,
      {
        hasBackdrop:false,
        disableClose:true,
        enterAnimationDuration:'1s',
        exitAnimationDuration:'1s'
      })
  }
}
