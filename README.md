# Diksyonè Kreyòl

**Yon diksyonè Kreyòl–Kreyòl gratis e louvri sou entènèt** – chak mo Kreyòl, esplike an Kreyòl, ak
definisyon, egzanp ak pwononsyasyon. Yon pwojè [Ayiti Dijital](https://ayitidijital.org).

**Adrès:** https://diksyone.ayitidijital.org · **Estati:** 33 premye mo yo la, tout se bouyon (yon moun ki pale
Kreyòl kòm lang manman l poko tcheke yo).

## Ede nou

« Men anpil chay pa lou ». Ou ka:

- ekri definisyon ak egzanp an Kreyòl,
- tcheke mo yo, si Kreyòl se lang manman w,
- pwopoze mo ki manke.

Ekri nou: kontakt@ayitidijital.org

**Règ pou kontni an:** se sèlman sa nou ekri nou menm. Pa janm kopye lòt diksyonè (liv oswa sit
entènèt).

## Mo yo

Chak mo se yon fichye: `entries/<lèt>/<mo>.json` (egzanp: `entries/c/chat.json`). Pwononsyasyon an soti nan règ son
TTS Ayiti Dijital la ([haitian-creole-tts](https://github.com/Ayiti-Dijital/haitian-creole-tts)). Anvan chak build,
`tools/build-index.mjs` tcheke tout fichye yo.

## Lisans

- **Done ak tèks diksyonè a:** CC BY-NC-SA 4.0 – gade [`LICENSE-DATA.md`](LICENSE-DATA.md)
- **Kòd la:** Apache-2.0 – gade [`LICENSE`](LICENSE)

---

## English

An open, free **Kreyòl–Kreyòl (monolingual Haitian Creole) dictionary** by Ayiti Dijital. Each word is one JSON
file in `entries/`; `pnpm build` checks them all (`tools/build-index.mjs`) and prerenders one page per word and
per letter. The first 33 words are drafts (`bouyon`) waiting for a native-speaker review.

### Run it

Angular 22, Tailwind CSS v4, pnpm. Node `^22.22.3`, `^24.15.0` or `>=26`.

```bash
pnpm install
pnpm start        # dev server on http://localhost:4200
pnpm test         # unit tests (Vitest)
pnpm build        # static, prerendered site in dist/diksyone-kreyol/browser
```

Every page is prerendered to static HTML: no server and no backend. The site loads nothing from other
servers (no external fonts, scripts or trackers).

### License

Code: Apache-2.0. Dictionary data and text: CC BY-NC-SA 4.0.
