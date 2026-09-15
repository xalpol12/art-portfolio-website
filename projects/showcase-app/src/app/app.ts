import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent} from '@ngx-artist-portfolio';

@Component({
  selector: 'app-root', imports: [LayoutComponent], template: `
    <apw-layout/>
  `, changeDetection: ChangeDetectionStrategy.Eager,
 styleUrl: './app.scss'
})
export class App {
}
