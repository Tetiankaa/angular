import { Component } from '@angular/core';
import {UserComponent} from "../../components/user/user.component";
import {UserDetailsComponent} from "../../components/user-details/user-details.component";

@Component({
  selector: 'app-user-details-page',
  standalone: true,
  imports: [
    UserComponent,
    UserDetailsComponent
  ],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.css'
})
export class UserDetailsPageComponent {

}
