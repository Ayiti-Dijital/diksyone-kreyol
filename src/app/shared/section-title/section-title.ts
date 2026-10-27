import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

/** A centered section heading with a small icon above it. */
@Component({
  imports: [Icon],
  selector: 'dk-section-title',
  templateUrl: './section-title.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitle {
  readonly icon = input.required<IconName>();
  readonly headingId = input.required<string>();
}
