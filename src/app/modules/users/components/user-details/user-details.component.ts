import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {IUser} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  user:IUser
    constructor(private activatedRoute:ActivatedRoute,private userService:UserService) {
    this.activatedRoute.params.subscribe(({id})=>{
      this.userService.getById(id).subscribe(value => this.user = value)
    })
    }

}
