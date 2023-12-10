import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {CarService} from "../../services";
import {ICar} from "../../interfaces";

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit{
  form:FormGroup
  carForUpdate:ICar
  constructor(private fb:FormBuilder, private  carService:CarService) {
  }
  ngOnInit(): void {
    this._formInit();
    this.carService.getCarForUpdate().subscribe(value=>{
        this.carForUpdate = value;

        if (value){
          const {brand,year, price} = value;

          this.form.patchValue({brand,year, price})
        }
    })
  }

  _formInit():void{
      this.form = this.fb.group({
        brand:['',
          [Validators.required,
           Validators.pattern(/^[a-zA-Zа-яА-яёЁіІїЇ]{1,20}$/)
          ]],
        price:['',
          [Validators.required,
            Validators.min(0),
            Validators.max(1000000),
            Validators.pattern(/^\d*$/)
          ]],
        year:['',
          [Validators.required,
            Validators.min(1990),
            Validators.max(new Date().getFullYear()),
            Validators.pattern(/^\d*$/)
          ]]
      })
  }

  create():void {
    this.carService.create(this.form.value).subscribe(()=>{
      this.carService.setTrigger();
      this.form.reset();
    })
  }

  update():void{
    this.carService.updateById(this.carForUpdate.id, this.form.value).subscribe(()=>{
      this.carService.setTrigger();
      this.carService.setCarForUpdate(null);
      this.form.reset()
    })
  }
}
