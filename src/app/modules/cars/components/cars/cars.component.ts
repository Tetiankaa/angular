import {Component, Input, OnInit} from '@angular/core';

import {CarService} from "../../../../services";
import {ICar, IPagination} from "../../../../interfaces";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent{
 @Input() cars:ICar[]

}
