import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarsService} from "../../../../services";
import {ICar} from "../../../../interfaces";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit{
  form:FormGroup
  carForUpdate:ICar

  constructor(private formBuilder:FormBuilder, private carsService:CarsService) {
  }

  ngOnInit(): void {
    this._initForm();

    this.carsService.getCarForUpdate().subscribe(car=>{
      this.carForUpdate = car;

      if (car){
        const {brand,year,price} = car;
        this.form.setValue({brand,year,price})
      }
    })
  }

  _initForm(){
    this.form = this.formBuilder.group({
      brand:['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Zа-яА-яёЁіІїЇ]{1,20}$/)
      ]],
      price:['',[
        Validators.required,
        Validators.min(0),
        Validators.max(1000000)
      ]],
      year:['',[
        Validators.required,
        Validators.min(1990),
        Validators.max(new Date().getFullYear())
      ]]
    })
  }

  updateCar() {
    this.carsService.updateById(this.carForUpdate.id, this.form.value).subscribe(()=>{
      this.carsService.setTrigger();
      this.carsService.setCarForUpdate(null);
      this.carForUpdate = null;
      this.form.reset();
    })
  }

  createCar() {
    this.carsService.create(this.form.value).subscribe(()=>{
      this.carsService.setTrigger();
      this.form.reset();
    })
  }
}
