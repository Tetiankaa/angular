import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

    this.carService.getCarForUpdate().subscribe(value => {
      this.carForUpdate = value;

      if (value){
        const {brand, price,year} = value;
        this.form.patchValue({brand, price,year})
      }
    })

  }

  _initForm():void{
    this.form = this.fb.group(
      {
        brand:['',[
          Validators.required,
          Validators.pattern(/^[a-zA-Zа-яА-яёЁіІїЇ]{1,20}$/)
        ]],
        price:['',
          Validators.required,
          Validators.min(0),
          Validators.max(1000000),
          Validators.pattern(/^\d*$/),
        ],
        year:['',
          Validators.required,
          Validators.min(1990),
          Validators.max(new Date().getFullYear()),
          Validators.pattern(/^\d*$/),
        ],
      }
    )
  }

  update():void{
    this.carService.updateById(this.carForUpdate.id, this.form.value).subscribe(()=>{
      this.carService.setTrigger();
      this.carService.setCarForUpdate(null);
      this.form.reset();
    })
  }

  create():void{
    this.carService.create(this.form.value).subscribe(()=>{
      this.carService.setTrigger();
      this.form.reset();
    })
  }

}
