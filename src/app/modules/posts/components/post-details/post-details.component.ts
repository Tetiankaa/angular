import { Component } from '@angular/core';
import {IPost} from "../../interfaces/post.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  post:IPost

  constructor(private activatedRoute:ActivatedRoute, private postService:PostService) {
    this.activatedRoute.params.subscribe(({id})=>{
      this.postService.getPostDetails(id).subscribe(value => this.post = value)
    })

  }
}
