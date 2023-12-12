import {Routes} from '@angular/router';

import {MainLayoutComponent} from "./layout";
import {PostsPageComponent, UserDetailsPageComponent, UsersPageComponent} from "./pages";
import {userDetailsResolver} from "./services";

export const routes: Routes = [
  {path:'',component:MainLayoutComponent, children:[
      {path:"",redirectTo:'users',pathMatch:"full"},
      {path:'users',component:UsersPageComponent, children:[
          {path:':id',resolve:{userData:userDetailsResolver} ,component:UserDetailsPageComponent}
        ]},
      {path:'posts', component:PostsPageComponent}
    ]}
];
