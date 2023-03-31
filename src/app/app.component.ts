import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {
    '[class.ltr]': '(appDir === \'ltr\')',
    '[class.rtl]': '(appDir === \'rtl\')'
  },
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appDir: string = 'ltr';
  htmlElement = document.getElementsByTagName('html')[0];
  constructor() {
    this.htmlElement.setAttribute('dir', this.appDir);
  }
}
