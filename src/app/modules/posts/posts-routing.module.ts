import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PostsPageComponent} from "./pages/posts-page/posts-page.component";
import {PostDetailsPageComponent} from "./pages/post-details-page/post-details-page.component";

const routes: Routes = [
  {path:'', component:PostsPageComponent, children:[
      {path:':id', component:PostDetailsPageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
