import {Component, OnInit} from '@angular/core';
import {CarService} from "../../../../services";
import {ICar} from "../../../../interfaces";
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrl: './car-page.component.css'
})
export class CarPageComponent implements OnInit{
  cars:ICar[]
  length:number
  pageIndex:number
  pageSize = 10

  constructor(private carService:CarService, private router:Router) {
  }
  ngOnInit(): void {
    this.carService.getAll().subscribe(value => {
      this.cars = value.items;
      this.length = value.total_items
    })

  }

  handlePageEvent(event: PageEvent) {
    this.router.navigate([],{queryParams:{page:event.pageIndex}})
  }
}
