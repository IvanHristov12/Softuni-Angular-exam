import { Component } from '@angular/core';
import { RecentPostsComponent } from '../recent-posts/recent-posts.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RecentPostsComponent],
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
