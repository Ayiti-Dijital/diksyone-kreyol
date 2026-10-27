import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'sun'
  | 'book'
  | 'heart'
  | 'dice'
  | 'license'
  | 'quiz'
  | 'riddle'
  | 'grid-small'
  | 'grid-large'
  | 'letters'
  | 'people';

/** Small line icons drawn for this site. Decorative: hidden from screen readers. */
@Component({
  selector: 'dk-icon',
  templateUrl: './icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'inline-block' },
})
export class Icon {
  readonly name = input.required<IconName>();
}
