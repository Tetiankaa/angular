import {Component, OnInit} from '@angular/core';

import {IUser} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users:IUser[]

  constructor(private userService:UserService) {
  }
  ngOnInit(): void {
    this.userService.getAll().subscribe(value => this.users = value)
  }

}
