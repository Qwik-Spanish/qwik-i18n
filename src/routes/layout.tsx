import { component$, Slot } from '@builder.io/qwik';
import { loader$, RequestHandler } from '@builder.io/qwik-city';
import { config } from '~/config/speak-i18n';

import Header from '../components/header/header';

export const useServerTimeLoader = loader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const serverTime = useServerTimeLoader();
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
          <div>{serverTime.value.date}</div>
        </a>
      </footer>
    </>
  );
});


export const onRequest: RequestHandler = ({ request, locale }) => {
  const cookie = request.headers?.get('cookie');
  const acceptLanguage = request.headers?.get('accept-language');

  let lang: string | null = null;
  // Try whether the language is stored in a cookie
  if (cookie) {
    const result = new RegExp('(?:^|; )' + encodeURIComponent('locale') + '=([^;]*)').exec(cookie);
    if (result) {
      lang = JSON.parse(result[1])['lang'];
    }
  }
  // Try to use user language
  if (!lang) {
    if (acceptLanguage) {
      lang = acceptLanguage.split(';')[0]?.split(',')[0];
    }
  }

  // Set Qwik locale
  locale(lang || config.defaultLocale.lang);
};