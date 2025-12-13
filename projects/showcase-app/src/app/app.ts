import {Component} from '@angular/core';
import {LayoutComponent} from '../../../ngx-artist-portfolio/src/lib/features/layout.component';

@Component({
  selector: 'app-root', imports: [LayoutComponent], template: `
    <apw-layout/>
  `, styleUrl: './app.scss'
})
export class App {
}
