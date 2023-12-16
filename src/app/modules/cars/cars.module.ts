import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarPageComponent } from './pages/car-page/car-page.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarComponent } from './components/car/car.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    CarPageComponent,
    CarsComponent,
    CarComponent,
    CarFormComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MatExpansionModule,
    MatPaginatorModule
  ]
})
export class CarsModule { }
