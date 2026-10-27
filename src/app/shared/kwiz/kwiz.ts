import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { makeQuestion } from '../kwiz-questions';

/** A one-question quiz about the dictionary's words, with a check and a "next question" button. */
@Component({
  imports: [RouterLink],
  selector: 'dk-kwiz',
  templateUrl: './kwiz.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Kwiz {
  /** The first question's seed; the home page passes the day. */
  readonly start = input.required<number>();

  /** Follows `start`, and moves on with "Lòt kesyon". */
  protected readonly seed = linkedSignal(() => this.start());
  protected readonly question = computed(() => makeQuestion(this.seed()));

  protected readonly chosen = signal<number | null>(null);
  protected readonly checked = signal(false);
  protected readonly right = computed(() => this.chosen() === this.question().answer);

  protected choose(index: number): void {
    if (!this.checked()) this.chosen.set(index);
  }

  protected check(): void {
    if (this.chosen() !== null) this.checked.set(true);
  }

  protected nextQuestion(): void {
    this.seed.update((seed) => seed + 1);
    this.chosen.set(null);
    this.checked.set(false);
  }
}
