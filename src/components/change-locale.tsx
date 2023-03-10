import { component$, $ } from '@builder.io/qwik';
import { changeLocale, $translate as t, useSpeakContext, useSpeakConfig, SpeakLocale } from 'qwik-speak';

export const ChangeLocale = component$(() => {
  const ctx = useSpeakContext();
  const config = useSpeakConfig();

  const changeLocale$ = $(async (newLocale: SpeakLocale) => {
    await changeLocale(newLocale, ctx);

    // Store locale in a cookie 
    document.cookie = `locale=${JSON.stringify(newLocale)};max-age=86400;path=/`;
  });

  return (
    <div>
      <div>{t('app.changeLocale@@Change locale')}</div>
      {config.supportedLocales.map(value => (
        <button onClick$={async () => await changeLocale$(value)}>
          {value.lang}
        </button>
      ))}
    </div>
  );
});