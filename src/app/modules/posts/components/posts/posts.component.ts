import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPost} from "../../interfaces/post.interface";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
  posts:IPost[]
constructor(private postService:PostService) {
    }


  ngOnInit(): void {
    this.postService.getAll().subscribe(value => this.posts = value)
  }
}
