import { Routes } from '@angular/router';

import {PostsPageComponent, UserDetailsPageComponent, UsersPageComponent} from "./pages";
import {MainLayoutComponent} from "./layouts";


export const routes: Routes = [
  {path:'',component:MainLayoutComponent, children:[
      {path:'',redirectTo:'users',pathMatch:"full"},
      {path:'users',component:UsersPageComponent,children:[
          {path:':id', component:UserDetailsPageComponent}
        ]},
      {path:'posts',component:PostsPageComponent}
    ]}
];
