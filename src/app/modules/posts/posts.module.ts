import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailsPageComponent } from './pages/post-details-page/post-details-page.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';


@NgModule({
  declarations: [
    PostsPageComponent,
    PostsComponent,
    PostComponent,
    PostDetailsPageComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
