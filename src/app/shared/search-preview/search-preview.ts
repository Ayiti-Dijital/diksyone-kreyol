import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import { mailto } from '../site';

/** What the visitor sees under the search box. */
type Result = { kind: 'idle' } | { kind: 'empty' } | { kind: 'not-ready'; word: string };

/**
 * The search box of the landing page. The dictionary has no entries yet, so a search
 * answers "not ready" and offers to propose the word by email.
 */
@Component({
  imports: [FormField, FormRoot],
  selector: 'dk-search-preview',
  templateUrl: './search-preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPreview {
  /** `compact`: round field with an icon button (header). `large`: field plus a wide button. */
  readonly variant = input<'compact' | 'large'>('compact');
  /** Each search box on a page needs its own id. */
  readonly inputId = input('mo');

  protected readonly result = signal<Result>({ kind: 'idle' });

  protected readonly searchForm = form(signal({ mo: '' }), {
    submission: {
      action: async (field) => {
        const word = field.mo().value().trim();
        this.result.set(word ? { kind: 'not-ready', word } : { kind: 'empty' });
        return undefined;
      },
    },
  });

  protected readonly word = computed(() => {
    const result = this.result();
    return result.kind === 'not-ready' ? result.word : '';
  });

  protected readonly proposeHref = computed(() =>
    mailto(`Diksyonè Kreyòl – pwopoze mo: ${this.word()}`),
  );
}
