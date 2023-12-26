import {Component, OnInit} from '@angular/core';
import {CarsService} from "../../../../services";
import {ICar} from "../../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit{
  cars:ICar[]
  currentPage:number
  totalPages:number

  constructor(private carsService:CarsService, private activatedRoute:ActivatedRoute, private router:Router) {
  }
  ngOnInit(): void {
    this.carsService.getTrigger().subscribe(()=>{
      this.activatedRoute.queryParams.subscribe(({page})=>{
          this.currentPage = page ? +page : 1;

          this.carsService.getAll(this.currentPage).subscribe(value=>{
              this.cars = value.items;
              this.totalPages = value.total_pages;

    })
  })
    })
  }


  prev() {
    const prevPage = this.currentPage - 1;

    if (prevPage >= 1){
      this.router.navigate([],{queryParams:{page:prevPage}})
    }
  }

  next() {
    const nextPage = this.currentPage + 1;
    this.router.navigate([],{queryParams:{page:nextPage}})
  }
}
