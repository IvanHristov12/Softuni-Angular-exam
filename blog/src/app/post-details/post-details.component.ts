import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebasePostService } from '../services/firebase-post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: { id: string; title: string; content: string; author: string } | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: FirebasePostService
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.fetchPostDetails(postId);
    }
  }

  fetchPostDetails(postId: string): void {
    this.postService.getPostById(postId).subscribe((data) => {
      if (data) {
        this.post = data;
      } else {
        console.log('Post not found');
      }
    });
  }
}
