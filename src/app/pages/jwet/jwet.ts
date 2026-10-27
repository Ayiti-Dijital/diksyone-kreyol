import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { Icon, IconName } from '../../shared/icon/icon';
import { MAIN_SITE_URL, mailto } from '../../shared/site';

interface Game {
  readonly id: string;
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
  /** Number of questions, shown as small markers (quiz only). */
  readonly questions?: number;
}

interface Question {
  readonly question: string;
  readonly answer: string;
}

/** Kreyòl word games – the page lists them; none is playable yet. */
@Component({
  imports: [Breadcrumb, Icon],
  selector: 'dk-jwet',
  templateUrl: './jwet.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Jwet {
  protected readonly crumbs: readonly Crumb[] = [{ label: 'Akèy', link: '/' }, { label: 'Jwèt' }];

  protected readonly games: readonly Game[] = [
    {
      id: 'kwiz',
      icon: 'quiz',
      title: 'Kwiz Kreyòl',
      description: 'Dis kesyon sou lang Kreyòl la ak kilti Ayiti. Konbyen ou ka jwenn?',
      questions: 10,
    },
    {
      id: 'devinet',
      icon: 'riddle',
      title: 'Tim tim? Bwa chèch!',
      description: 'Devinèt Kreyòl: nou poze devinèt la, ou chèche repons lan.',
    },
    {
      id: 'ti-mo-kwaze',
      icon: 'grid-small',
      title: 'Ti mo kwaze',
      description: 'Yon ti griy mo kwaze chak jou, pou senk minit.',
    },
    {
      id: 'gwo-mo-kwaze',
      icon: 'grid-large',
      title: 'Gwo mo kwaze',
      description: 'Mo kwaze klasik, ak definisyon an Kreyòl.',
    },
    {
      id: 'cheche-mo',
      icon: 'letters',
      title: 'Chèche mo',
      description: 'Jwenn mo Kreyòl ki kache nan mitan yon pakèt lèt.',
    },
    {
      id: 'kwiz-zanmi',
      icon: 'people',
      title: 'Kwiz ak zanmi',
      description: 'Kreye pwòp kwiz ou epi jwe l an dirèk ak zanmi w.',
    },
  ];

  protected readonly faq: readonly Question[] = [
    { question: 'Èske jwèt yo gratis?', answer: 'Wi. Tout jwèt yo ap gratis pou tout moun.' },
    { question: 'Èske m bezwen yon kont?', answer: 'Non. Ou ka jwe san kont, san imèl.' },
    {
      question: 'Ki lè jwèt yo ap pare?',
      answer: 'Byento. Nou ap fè yo ak premye mo diksyonè a, lè moun ki pale Kreyòl fin tcheke yo.',
    },
    {
      question: 'Kiyès ki fè jwèt yo?',
      answer:
        'Ayiti Dijital, yon asosyasyon san bi likratif ki bati enfrastrikti dijital louvri pou Ayiti.',
    },
  ];

  protected readonly ideaHref = mailto('Jwèt Kreyòl – mwen gen yon ide');
  protected readonly mainSiteUrl = MAIN_SITE_URL;

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content: 'Jwèt Kreyòl: kwiz, mo kwaze, devinèt ak chèche mo – gratis, san kont. Byento.',
    });
  }
}
