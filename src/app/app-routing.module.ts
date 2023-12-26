import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";

const routes: Routes = [
  {path:'',component:MainLayoutComponent,children:[
      {path:'cars', loadChildren:()=>import('./modules/cars/cars.module').then(m=>m.CarsModule)},
      {path:'auth', loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
