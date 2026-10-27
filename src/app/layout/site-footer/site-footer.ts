import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_EMAIL, MAIN_SITE_URL, REPO_URL, mailto } from '../../shared/site';

@Component({
  imports: [RouterLink],
  selector: 'dk-site-footer',
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly contactEmail = CONTACT_EMAIL;
  protected readonly contactHref = mailto('Diksyonè Kreyòl');
  protected readonly mainSiteUrl = MAIN_SITE_URL;
  protected readonly repoUrl = REPO_URL;
}
