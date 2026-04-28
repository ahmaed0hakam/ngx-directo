import { Provider, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DirectoConfig, DIRECTO_CONFIG, DIRECTO_LOADER } from '../models/directo.config';

/**
 * Main Provider Helper for the Directo SDK.
 * Configures the directionality system, pre-loads fonts, and sets up reactive signals.
 * 
 * @author Ahmad Alhafi
 * @param config The global Directo configuration object including language definitions and default settings.
 * @returns EnvironmentProviders for use in bootstrapApplication or app.config.ts
 * 
 * @example
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideDirecto({
 *       languages: { 
 *         ar: { direction: 'rtl', fontFamily: 'Cairo' },
 *         en: { direction: 'ltr', fontFamily: 'Inter' }
 *       },
 *       defaultLang: 'en',
 *       loader: {
 *         provide: DIRECTO_LOADER,
 *         useFactory: (http: HttpClient) => new DirectoHttpLoader(http),
 *         deps: [HttpClient]
 *       }
 *     })
 *   ]
 * });
 * ```
 */
export function provideDirecto(config?: DirectoConfig): EnvironmentProviders {
  const providers: Provider[] = [
    {
      provide: DIRECTO_CONFIG,
      useValue: config || null
    }
  ];

  if (config?.loader) {
    providers.push(config.loader);
  }

  return makeEnvironmentProviders(providers);
}
