// (1)
import { $ } from '@builder.io/qwik';
// (2)
import { isServer } from '@builder.io/qwik/build';
// (3)
import type {
  LoadTranslationFn,
  SpeakConfig,
  TranslationFn
} from 'qwik-speak';

const defaultLocale = { lang: 'es', currency: 'EUR', timeZone: 'Europe/Madrid' };

// 4
export const config: SpeakConfig = {
    // lang: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // currency: https://en.wikipedia.org/wiki/List_of_circulating_currencies
    // timezone: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  defaultLocale: { lang: 'es', currency: 'EUR', timeZone: 'Europe/Madrid' },
  supportedLocales: [
    { lang: 'es-ES', currency: 'EUR', timeZone: 'Europe/Madrid' },
    { lang: 'eu-ES', currency: 'EUR', timeZone: 'Europe/Madrid' },
    { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' }
  ],
  assets: [
    'app' // Translations shared by the pages
  ]
};

export const loadTranslation$: LoadTranslationFn = $(async (lang: string, asset: string, origin?: string) => {
  let url = '';
  // Absolute urls on server
  if (isServer && origin) {
    url = origin;
  }
  url += `/i18n/${lang}/${asset}.json`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }
  else if (response.status === 404) {
    console.warn(`loadTranslation$: ${url} not found`);
  }
});

export const translationFn: TranslationFn = {
  loadTranslation$: loadTranslation$
};