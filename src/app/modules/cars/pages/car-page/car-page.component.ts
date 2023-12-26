import {Component, OnInit} from '@angular/core';
import {CarService} from "../../../../services";
import {ICar} from "../../../../interfaces";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private carService:CarService, private router:Router, private activatedRoute:ActivatedRoute) {
  }
  ngOnInit(): void {
this.carService.getTrigger().subscribe(()=>{
  this.activatedRoute.queryParams.subscribe(({page})=>{
    this.carService.getAll(page).subscribe(value => {
      this.cars = value.items;
      this.length = value.total_items
    })
  })
  this.router.navigate([], {queryParams:{page:1}})
})



  }

  handlePageEvent(event: PageEvent) {
    this.router.navigate([],{queryParams:{page:event.pageIndex+1}})
  }
}
