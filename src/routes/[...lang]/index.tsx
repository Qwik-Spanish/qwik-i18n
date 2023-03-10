import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {
  $translate as t,
  formatDate as fd,
  formatNumber as fn,
  Speak,
} from 'qwik-speak';
export const Home = component$(() => {
  // t ($translate) se usa para traducir los textos mediante la referencia <fichero>.<propiedad>
  // El fichero se encuentra cuando se genere en src/public/i18n/<lang-code>/<fichero>.json
  // h1 => app.json => title será la propiedad (con la opción de valor dinámico name) y valor por defecto con @@
  // h3 => home.json => dates propiedad y valor por defecto (@@) será "Dates"
  // fd (formatDate)para darle formato en base al idioma seleccionado
  // Se tiene en cuenta su estilo de fecha (dateStyle) con estos valores:
  // "full" | "long" | "medium" | "short" | undefined;
  // Y su timeStyle:
  // "full" | "long" | "medium" | "short" | undefined;
  // fn (formatNumber) para darle formato en base al idioma seleccionado
  /**
   * interface NumberFormatOptions {
        compactDisplay?: "short" | "long" | undefined;
        notation?: "standard" | "scientific" | "engineering" | "compact" | undefined;
        signDisplay?: "auto" | "never" | "always" | "exceptZero" | undefined;
        unit?: string | undefined;
        unitDisplay?: "short" | "long" | "narrow" | undefined;
        currencyDisplay?: string | undefined;
        currencySign?: string | undefined;
    }
   */
  return (
    <>
      <h1>
        {t('app.title@@Welcome to {{name}}', { name: 'Qwik' })} <span class='lightning'>⚡️</span>
      </h1>

      <h3>{t('home.dates@@Dates')}</h3>
      <p>{fd(Date.now(), { dateStyle: 'full', timeStyle: 'short' })}</p>

      <h3>{t('home.numbers@@Numbers')}</h3>
      <p>{fn(1000000, { style: 'currency' })}</p>
    </>
  );
});
export default component$(() => {
  return (
    <div>
      <Speak assets={['home']}>
        <Home />
      </Speak>
    </div>
  );
});


export const head: DocumentHead = {
  title: 'runtime.home.head.title@@Qwik Speak',
  meta: [{ name: 'description', content: 'runtime.home.head.description@@Qwik Speak with localized routing' }]
};