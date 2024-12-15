import { Component, OnInit } from '@angular/core';
import { FirebasePostService } from '../services/firebase-post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recent-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css'],
})
export class RecentPostsComponent implements OnInit {
  posts: { id: string; title: string; content: string; author: string }[] = [];

  constructor(private postService: FirebasePostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      console.log('Fetched Posts:', data); // Log all fetched posts
      this.posts = data.slice(-3).reverse(); // Get the last 3 posts and reverse them
      console.log('Recent Posts:', this.posts); // Log the most recent 3 posts
    });
  }
}
