import {Component, OnInit} from '@angular/core';
import {ICar} from "../../interfaces";
import {CarService} from "../../services";
import {CarComponent} from "../car/car.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    CarComponent,
    NgForOf
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit{
  cars:ICar[]

  constructor(private carService:CarService) {}

  ngOnInit(): void {
    this.carService.getTriggerStatus().subscribe(()=>{
      this.carService.getAll().subscribe(value => this.cars = value)
    })
  }

}
