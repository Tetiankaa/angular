import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services";
import {IUser} from "../../interfaces";
import {UserComponent} from "../user/user.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserComponent,
    NgForOf
  ],
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
