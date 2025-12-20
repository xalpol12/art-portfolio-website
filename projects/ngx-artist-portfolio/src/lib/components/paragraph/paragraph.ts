import {Component, input, Signal} from '@angular/core';

@Component({
  selector: `apw-paragraph`,
  template: `<p class="ngx-ap-body"><ng-content></ng-content></p>`,
  standalone: true,
  imports: []
})
export class Paragraph {
  content: Signal<string> = input('');
}
