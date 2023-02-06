import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  name = 'Talip Cesur';
  description = 'FullStack JavaScript Developer based in Strasbourg, France.';
  link = [
    {
      name: 'github',
      href: 'https://github.com/talipcr',
    },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/talipcesur/',
    },
    {
      name: 'stackblitz',
      href: 'https://stackblitz.com/@talipcr',
    },
    {
      name: 'email',
      href: 'mailto:talip.cesur@gmail.com',
    },
  ];
  lang = ['fr', 'en', 'tr'];
}
