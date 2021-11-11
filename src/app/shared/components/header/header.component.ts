import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  name = 'Talip Cesur';
  description = 'test';

  constructor() {}

  ngOnInit(): void {
    this.name = 'Talip Cesur';
    this.description =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui saepe odio aut! Maxime voluptas qui recusandae numquam voluptatibus saepe, accusantium ipsa natus totam ut esse eligendi doloremque quaerat unde perspiciatis.';
  }
}
