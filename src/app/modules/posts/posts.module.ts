import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import {PostService} from "./services";


@NgModule({
  declarations: [
    PostsPageComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ],
  providers:[
    PostService
  ]
})
export class PostsModule { }
