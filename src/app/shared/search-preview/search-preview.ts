import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Entry, isExact, search } from '../diksyone';
import { mailto } from '../site';

/** What the visitor sees under the search box. */
type Result =
  | { kind: 'idle' }
  | { kind: 'empty' }
  | { kind: 'some'; word: string; entries: readonly Entry[] }
  | { kind: 'none'; word: string };

/**
 * The dictionary search. A word that matches an entry exactly (accents optional) opens its page;
 * otherwise the box lists the entries that start with it, or offers to propose the word by email.
 */
@Component({
  imports: [FormField, FormRoot, RouterLink],
  selector: 'dk-search-preview',
  templateUrl: './search-preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPreview {
  /** `compact`: round field with an icon button (header). `large`: field plus a wide button. */
  readonly variant = input<'compact' | 'large'>('compact');
  /** Each search box on a page needs its own id. */
  readonly inputId = input('mo');

  private readonly router = inject(Router);

  protected readonly result = signal<Result>({ kind: 'idle' });

  protected readonly searchForm = form(signal({ mo: '' }), {
    submission: {
      action: async (field) => {
        const word = field.mo().value().trim();
        const entries = search(word);
        if (!word) {
          this.result.set({ kind: 'empty' });
        } else if (entries.length && isExact(entries[0], word)) {
          this.result.set({ kind: 'idle' });
          await this.router.navigate(['/mo', entries[0].id]);
        } else {
          this.result.set(
            entries.length ? { kind: 'some', word, entries } : { kind: 'none', word },
          );
        }
        return undefined;
      },
    },
  });

  protected readonly word = computed(() => {
    const result = this.result();
    return result.kind === 'some' || result.kind === 'none' ? result.word : '';
  });

  protected readonly entries = computed(() => {
    const result = this.result();
    return result.kind === 'some' ? result.entries : [];
  });

  protected readonly proposeHref = computed(() =>
    mailto(`Diksyonè Kreyòl – pwopoze mo: ${this.word()}`),
  );
}
