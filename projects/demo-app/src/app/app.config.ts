import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideDirecto } from 'ngx-directo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideDirecto({
      languages: {
        en: {
          direction: 'ltr',
          fontFamily: "'Inter', sans-serif",
          googleFontName: 'Inter',
          translations: {
            HERO: {
              SUBTITLE: 'Modern directionality and localization for Angular'
            },
            FOOTER: {
              CREATED_BY: 'Created by'
            }
          }
        },
        ar: {
          direction: 'rtl',
          fontFamily: "'Cairo', sans-serif",
          googleFontName: 'Cairo',
          localizeDigits: true,
          translations: {
            HERO: {
              SUBTITLE: 'التوافقية الجهوية والترجمة الحديثة لمنصة أنجولار'
            },
            FOOTER: {
              CREATED_BY: 'تم الإنشاء بواسطة'
            }
          }
        }
      },
      defaultLang: 'en'
    })
  ]
};
