import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Entry } from '../diksyone';
import { Icon } from '../icon/icon';

const MONTHS = [
  'janvye',
  'fevriye',
  'mas',
  'avril',
  'me',
  'jen',
  'jiyè',
  'out',
  'septanm',
  'oktòb',
  'novanm',
  'desanm',
];

/**
 * The buttons on a word card: cite, share, copy and listen. They only use browser features
 * (clipboard, share sheet, speech), so the prerendered page shows them and they work after loading.
 */
@Component({
  imports: [Icon],
  selector: 'dk-word-actions',
  templateUrl: './word-actions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordActions {
  readonly entry = input.required<Entry>();

  private readonly document = inject(DOCUMENT);
  private readonly citeDialog = viewChild.required<ElementRef<HTMLDialogElement>>('citeDialog');

  /** A short message after an action, read out by screen readers. */
  protected readonly notice = signal('');
  protected readonly citation = signal('');

  protected openCite(): void {
    const today = new Date();
    const date = `${today.getDate()} ${MONTHS[today.getMonth()]} ${today.getFullYear()}`;
    this.citation.set(
      `«${this.entry().mo}». Diksyonè Kreyòl, Ayiti Dijital. ${this.pageUrl()} (konsilte ${date}).`,
    );
    const dialog = this.citeDialog().nativeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  protected closeCite(): void {
    const dialog = this.citeDialog().nativeElement;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  protected copyCitation(): Promise<void> {
    return this.copy(this.citation(), 'Sitasyon an kopye.');
  }

  protected copyWord(): Promise<void> {
    return this.copy(this.entry().mo, 'Mo a kopye.');
  }

  /** The phone's share sheet where there is one; otherwise the link is copied. */
  protected async share(): Promise<void> {
    const navigator = this.document.defaultView?.navigator;
    const data = {
      title: `${this.entry().mo} – Diksyonè Kreyòl`,
      text: this.entry().sans[0].definisyon,
      url: this.pageUrl(),
    };
    if (navigator?.share) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if ((error as DOMException).name === 'AbortError') return;
      }
    }
    await this.copy(this.pageUrl(), 'Lyen an kopye.');
  }

  /**
   * Reads the word with the browser's voice: a Kreyòl voice if the device has one, otherwise a
   * French one, which only comes close. The Wanga Nègès voice replaces this later.
   */
  protected speak(): void {
    const view = this.document.defaultView;
    const speech = view?.speechSynthesis;
    if (!view || !speech) {
      this.notice.set('Navigatè w la pa ka li mo a.');
      return;
    }
    const voices = speech.getVoices();
    const kreyol = voices.find((voice) => voice.lang.toLowerCase().startsWith('ht'));
    const voice = kreyol ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('fr'));
    const utterance = new view.SpeechSynthesisUtterance(this.entry().mo);
    utterance.lang = voice?.lang ?? 'fr-FR';
    if (voice) utterance.voice = voice;
    utterance.rate = 0.8;
    speech.cancel();
    speech.speak(utterance);
    this.notice.set(
      kreyol ? '' : 'Vwa sentetik navigatè a (fransè): pwononsyasyon an ka pa egzat.',
    );
  }

  private pageUrl(): string {
    const origin = this.document.location?.origin ?? '';
    return `${origin}/mo/${encodeURIComponent(this.entry().id)}`;
  }

  private async copy(text: string, done: string): Promise<void> {
    try {
      await this.document.defaultView!.navigator.clipboard.writeText(text);
      this.notice.set(done);
    } catch {
      this.notice.set(
        this.copyWithSelection(text) ? done : 'Nou pa t ka kopye. Seleksyone tèks la epi kopye l.',
      );
    }
  }

  /** Older way to copy, for browsers that block the clipboard API. */
  private copyWithSelection(text: string): boolean {
    const area = this.document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    this.document.body.append(area);
    area.select();
    let copied = false;
    try {
      copied = this.document.execCommand('copy');
    } catch {
      copied = false;
    }
    area.remove();
    return copied;
  }
}
