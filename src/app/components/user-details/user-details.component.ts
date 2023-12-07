import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "../../interfaces";
import {NgIf} from "@angular/common";
import {UserService} from "../../services";

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
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private userService:UserService) {
    this.activatedRoute.params.subscribe(({id})=>{
      this.userService.getById(id).subscribe(value => this.user = value)



      this.user  = this.router.getCurrentNavigation()?.extras.state as IUser;

      if (!this.user){
        this.userService.getById(id).subscribe(value => this.user = value)
      }
    })
  }

  ngOnInit(): void {
    // this.user  = this.router.getCurrentNavigation()?.extras.state as IUser;
  }

}
