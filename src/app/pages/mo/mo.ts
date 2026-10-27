import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { ENTRIES, displayPhones, findEntry } from '../../shared/diksyone';
import { mailto } from '../../shared/site';
import { WordActions } from '../../shared/word-actions/word-actions';

/** How many words the browse lists show on each side. */
const BROWSE = 10;

/** One word of the dictionary: /mo/:id */
@Component({
  imports: [RouterLink, Breadcrumb, WordActions],
  selector: 'dk-mo',
  templateUrl: './mo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Mo {
  /** The route parameter :id */
  readonly id = input.required<string>();

  protected readonly entry = computed(() => findEntry(this.id()));
  protected readonly phones = computed(() => {
    const entry = this.entry();
    return entry ? displayPhones(entry.pwononsyasyon) : '';
  });
  /** Syllables with a bar between them, like a print dictionary: "kon|bit". */
  protected readonly syllables = computed(() => this.entry()?.silab.join('|') ?? '');
  protected readonly categories = computed(() => [
    ...new Set(this.entry()?.sans.map((sens) => sens.kategori) ?? []),
  ]);

  /** The words before and after this one, in dictionary order. */
  protected readonly neighbours = computed(() => {
    const index = ENTRIES.findIndex((entry) => entry.id === this.entry()?.id);
    return index < 0
      ? { before: undefined, after: undefined }
      : { before: ENTRIES[index - 1], after: ENTRIES[index + 1] };
  });

  /** Up to ten words before and after this one, to browse like a print dictionary. */
  protected readonly browse = computed(() => {
    const index = ENTRIES.findIndex((entry) => entry.id === this.entry()?.id);
    return index < 0
      ? { before: [], after: [] }
      : {
          before: ENTRIES.slice(Math.max(0, index - BROWSE), index),
          after: ENTRIES.slice(index + 1, index + 1 + BROWSE),
        };
  });

  protected readonly crumbs = computed<readonly Crumb[]>(() => [
    { label: 'Akèy', link: '/' },
    { label: 'Diksyonè', link: '/' },
    { label: this.entry()?.mo ?? this.id() },
  ]);

  protected readonly fixHref = computed(() =>
    mailto(`Diksyonè Kreyòl – korije mo: ${this.entry()?.mo ?? this.id()}`),
  );
  protected readonly proposeHref = computed(() =>
    mailto(`Diksyonè Kreyòl – pwopoze mo: ${this.id()}`),
  );
}
