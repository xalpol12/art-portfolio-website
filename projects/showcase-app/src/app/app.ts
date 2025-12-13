import {Component} from '@angular/core';
import {LayoutComponent} from '@ngx-artist-portfolio';

@Component({
  selector: 'app-root', imports: [LayoutComponent], template: `
    <apw-layout/>
  `, styleUrl: './app.scss'
})
export class App {
}
