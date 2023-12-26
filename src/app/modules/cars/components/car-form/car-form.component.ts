import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CarService} from "../../../../services";
import {ICar} from "../../../../interfaces";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit{

  form:FormGroup
  carForUpdate:ICar

  constructor(private fb:FormBuilder, private carService:CarService) {
  }
  ngOnInit(): void {
    this._initForm();

    this.carService.getCarForUpdate().subscribe(value=>{
      this.carForUpdate = value;

      if (value){
        const {brand,price,year} = value;
        this.form.setValue({brand,price,year})
      }

    })
  }

  _initForm():void{
    this.form = this.fb.group({
      brand:[''],
      price:[''],
      year:['']
    })
  }

  save() {
    this.carService.create(this.form.value).subscribe(()=>{
      this.form.reset();
    })

  }

  update():void{
    this.carService.updateById(this.carForUpdate.id, this.form.value).subscribe(()=>{
      this.form.reset();
    })
  }
}
