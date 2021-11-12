import { Component } from '@angular/core';
import { postData } from 'src/app/shared/mock/data';

@Component({
  selector: 'app-homepage-blog',
  templateUrl: './homepage-blog.component.html',
  styleUrls: ['./homepage-blog.component.scss'],
})
export class HomepageBlogComponent {
  postData = postData;
}
