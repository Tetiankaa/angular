import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarsRoutingModule} from './cars-routing.module';
import {CarPageComponent} from './pages/car-page/car-page.component';
import {CarsComponent} from './components/cars/cars.component';
import {CarFormComponent} from './components/car-form/car-form.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { CarComponent } from './components/car/car.component';


@NgModule({
  declarations: [
    CarPageComponent,
    CarsComponent,
    CarFormComponent,
    CarComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MatExpansionModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CarsModule { }
