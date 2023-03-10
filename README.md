# Qwik City App - i18n - qwik-speak ⚡️

## Tutorial

Ir a la [siguiente referencia](https://robisim74.gitbook.io/qwik-speak/library/quick-start) y seguid los siguientes pasos.

### Básico

Instalar el paquete principal necesario después de crear el proyecto Qwik versión 0.19.2
```
npm install qwik-speak@0.6.2 --save-dev
```

Creamos el fichero `speak-i18n.ts` en el directorio `src/config` con el siguiente código:

```typescript

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

// 4
export const config: SpeakConfig = {
    // lang: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // currency: https://en.wikipedia.org/wiki/List_of_circulating_currencies
    // timezone: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  defaultLocale: { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' },
  supportedLocales: [
    { lang: 'es', currency: 'EUR', timeZone: 'Europe/Madrid' },
    { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' }
  ],
  assets: [
    'app' // Directorio de traducciones que va a estar disponible para compartir textos entre diferentes rutas
  ]
};

export const loadTranslation$: LoadTranslationFn = $(async (lang: string, asset: string, origin?: string) => {
  let url = '';
  // Absolute urls on server - Esto por si hacemos la carga desde el apartado del servidor
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
```

Hemos agregado la configuración Speak y la implementación de la función loadTranslation$. 

La carga de traducciones puede realizarse tanto en el servidor como en el cliente (en caso de SPA o cambio de idioma) y la función loadTranslation$ debe ser compatible con ambos.

Se requieren defaultLocale y supportedLocales porque la biblioteca usa la configuración regional predeterminada si se establece una configuración regional en tiempo de ejecución que no es compatible.

### Añadir el proveedor de Qwik para cargar las traducciones

Simplemente añadimos lo que tenemos con QwikCityProvider dentro del componente QwikSpeakProvider en `src/root.tsx` y debemos de pasarle las funciones de configuración (config) y traducción (translationFn) que hemos creado dentro de `src/config/speak-18n.ts`:

```typescript
import { component$, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
// Proveedor para los textos traducidos de i18n
import { QwikSpeakProvider } from 'qwik-speak';

import { RouterHead } from './components/router-head/router-head';

// Configuración y la función para ejecutar las traducciones
import { config, translationFn } from './config/speak-i18n';

import globalStyles from './global.css?inline';

export default component$(() => {
  useStyles$(globalStyles);

  return (
    /**
     * Init Qwik Speak (only available in child components)
     */
    <QwikSpeakProvider config={config} translationFn={translationFn}>
      <QwikCityProvider>
        <head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          <RouterHead />
        </head>
        <body>
          <RouterOutlet />
          <ServiceWorkerRegister />
        </body>
      </QwikCityProvider>
    </QwikSpeakProvider>
  );
});

```