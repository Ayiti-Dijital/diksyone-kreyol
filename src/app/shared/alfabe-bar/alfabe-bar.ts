import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ALFABE } from '../site';

/** The 32 letters and letter groups, each a link to its letter page. */
@Component({
  imports: [RouterLink],
  selector: 'dk-alfabe-bar',
  templateUrl: './alfabe-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfabeBar {
  /** The letter of the page being shown, if any. */
  readonly current = input<string>();
  protected readonly alfabe = ALFABE;
}
