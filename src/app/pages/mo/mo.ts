import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { ENTRIES, displayPhones, findEntry } from '../../shared/diksyone';
import { mailto } from '../../shared/site';
import { WordActions } from '../../shared/word-actions/word-actions';

/** How many words the browse lists show on each side. */
const BROWSE = 5;

/** A section of the word card, listed in the menu on the left. */
interface PageSection {
  readonly id: string;
  readonly label: string;
}

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

  /** The sections this word has, in page order: the menu on the left and the section titles. */
  protected readonly sections = computed<readonly PageSection[]>(() => {
    const entry = this.entry();
    if (!entry) return [];
    const related = entry.mo_ki_gen_rapo;
    const count = (label: string, n: number) => (n > 1 ? `${label} yo` : label);
    return [
      { id: 'sans', label: count('Sans', entry.sans.length) },
      ...(related?.sinonim?.length || related?.kontre?.length
        ? [{ id: 'sinonim', label: 'Sinonim ak kontrè' }]
        : []),
      ...(entry.orijin ? [{ id: 'orijin', label: 'Orijin' }] : []),
      ...(entry.ekspresyon?.length
        ? [{ id: 'ekspresyon', label: count('Ekspresyon', entry.ekspresyon.length) }]
        : []),
      ...(related?.gade_tou?.length ? [{ id: 'gade-tou', label: 'Gade tou' }] : []),
      { id: 'feyte', label: 'Feyte diksyonè a' },
    ];
  });

  private readonly document = inject(DOCUMENT);

  /** A link to a section of this page that also works before the page script has loaded. */
  protected sectionHref(id: string): string {
    return `/mo/${encodeURIComponent(this.entry()?.id ?? this.id())}#${id}`;
  }

  /** Scrolls smoothly to a section of the word card and puts it in the address bar. */
  protected jump(event: Event, id: string): void {
    const target = this.document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.document.defaultView?.history.replaceState(null, '', this.sectionHref(id));
  }

  /** The title of a section, the same as in the menu. */
  protected title(id: string): string {
    return this.sections().find((section) => section.id === id)?.label ?? '';
  }

  /** Synonyms and antonyms link to their page when the dictionary has them. */
  protected isEntry(word: string): boolean {
    return findEntry(word) !== undefined;
  }

  /** The words before and after this one, in dictionary order. */
  protected readonly neighbours = computed(() => {
    const index = ENTRIES.findIndex((entry) => entry.id === this.entry()?.id);
    return index < 0
      ? { before: undefined, after: undefined }
      : { before: ENTRIES[index - 1], after: ENTRIES[index + 1] };
  });

  /** Up to five words before and after this one, to browse like a print dictionary. */
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
