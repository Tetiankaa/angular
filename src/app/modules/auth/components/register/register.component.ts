import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  form:FormGroup
  error:boolean;
  registerClicked = false;
  constructor(private authService:AuthService, private formBuilder:FormBuilder, private router:Router) {
  }
  ngOnInit(): void {
    this._initForm();
  }

  _initForm(){
    this.form = this.formBuilder.group({
        username:['',[
          Validators.required,
          Validators.pattern(/^[a-zA-Z]\w{1,19}$/)
        ]],
      password:['',[
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[^\s]{8,20}$/)
      ]],
      re_password:['',[
        Validators.required,
        this._isPasswordsMatch('password')
      ]]
      }
    )
  }
  _isPasswordsMatch(controlName:string){
    this.registerClicked = false;

    return (control:AbstractControl):ValidationErrors | null=>{
      const originalPassword = control.root.get(controlName)?.value;
      const repeatedPassword = control.value;

      return originalPassword === repeatedPassword ? null : {'passwordMismatch':true}
    }
  }

  register() {
    this.registerClicked = true;

    if (this.form.valid){
      this.authService.register(this.form.value).subscribe({
        next:()=>{
          this.router.navigate(['/auth/login'])
        },
        error:()=>{
          this.error = true;
        },
        complete:()=>{
          this.error = false;
        }
      })
    }
  }
}
