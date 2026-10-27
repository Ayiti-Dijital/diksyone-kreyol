import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlfabeBar } from '../../shared/alfabe-bar/alfabe-bar';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { displayPhones, entriesStartingWith, soundExample } from '../../shared/diksyone';

/** One letter or letter group of the alphabet: /let/:letter */
@Component({
  imports: [RouterLink, AlfabeBar, Breadcrumb],
  selector: 'dk-let',
  templateUrl: './let.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Let {
  /** The route parameter :letter */
  readonly letter = input.required<string>();

  protected readonly example = computed(() => soundExample(this.letter()));
  protected readonly examplePhones = computed(() => {
    const example = this.example();
    return example ? displayPhones(example.pwononsyasyon) : '';
  });
  protected readonly words = computed(() => entriesStartingWith(this.letter()));

  protected readonly crumbs = computed<readonly Crumb[]>(() => [
    { label: 'Akèy', link: '/' },
    { label: 'Diksyonè', link: '/' },
    { label: `Lèt ${this.letter().toUpperCase()}` },
  ]);
}
