import { Component,OnInit} from '@angular/core';
import { Post} from './post';
import {PostService} from './post.service';

@Component ({
 selector: 'index',
 templateUrl: './index.component.html',
 styleUrls: []
})


export class IndexComponent implements OnInit {

  posts: Post[] = [];

constructor(private postservice:PostService) {}

  ngOnInit(): void {
    this.postservice.getAll().subscribe((data: Post[]) => {
    this.posts = data;
    console.log(this.posts);
    })
}

deletePost(id:number) {
  this.postservice.delete(id).subscribe(res => {
    this.posts = this.posts.filter(item => item.id !== id);
    console.log("the recoreded deleted successfully");
  })
}
}