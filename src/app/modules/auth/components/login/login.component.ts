import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form:FormGroup
  error:boolean

  constructor(private authService:AuthService, private router:Router, private formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
    this._initForm();
  }

  _initForm(){
    this.form = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next:()=>{
        this.router.navigate(['cars']);
        this.authService.getUserData().subscribe();
      },
      error:()=>{
        this.error = true
      },
      complete:()=>{
        this.error = false;
      }
    })
  }
}
