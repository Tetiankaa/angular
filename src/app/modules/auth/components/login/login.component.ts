import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form:FormGroup
  error=false

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {
  }
  ngOnInit(): void {
    this._initForm();
  }

  _initForm():void{
    this.form = this.formBuilder.group({
      username:[''],
      password:['']
      }
    )
  }

  login():void {
    this.authService.login(this.form.value).subscribe({
      next:()=>{
        this.router.navigate(['cars'])
      },
      error:(err)=>{
        console.log(err);
        this.error = true;
      },
      complete:()=>{
        this.error = false;
      }
    })
  }
}
