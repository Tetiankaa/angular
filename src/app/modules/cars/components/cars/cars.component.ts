import {Component, OnInit} from '@angular/core';

import {CarService} from "../../../../services";
import {ICar, IPagination} from "../../../../interfaces";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit{
  cars:ICar[]
  constructor(private carService:CarService) {
  }
  ngOnInit(): void {
    this.carService.getAll().subscribe(value => this.cars = value.items)

  }

}
