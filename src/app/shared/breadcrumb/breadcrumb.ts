import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Crumb {
  readonly label: string;
  readonly link?: string;
}

@Component({
  imports: [RouterLink],
  selector: 'dk-breadcrumb',
  templateUrl: './breadcrumb.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumb {
  readonly items = input.required<readonly Crumb[]>();
}
