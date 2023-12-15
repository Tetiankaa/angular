import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  formR:FormGroup
  error = false
  registerClicked = false;

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) {
  }

  ngOnInit(): void {
   this._formInit();
  }
  _formInit():void{
    this.formR = this.fb.group({
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
        this.matchPasswordValidator('password')
      ]]
    })
  }
  matchPasswordValidator(controlName:string){
    this.registerClicked = false;
    return (control:AbstractControl):ValidationErrors | null =>{ //control - represents the form control to which the validator is applied
      const originalPassword = control.root.get(controlName)?.value; //gets the root control (the entire form)
      const repeatedPassword = control.value;


      return originalPassword === repeatedPassword ? null : {'passwordMismatch':true}
    }


  }
  register() {
    this.registerClicked = true;

    if (this.formR.valid){
      this.authService.register(this.formR.value).subscribe({

        next:()=>{
          this.router.navigate(['/auth/login'])
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
}
