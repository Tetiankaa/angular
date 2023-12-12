import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{

  user:IUser
  constructor(private activatedRoute:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({userData}) => this.user=userData)
  }


}
