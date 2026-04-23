import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Now using the OFFICIAL published package! 
import {
  DirectoService,
  DirFlipDirective,
  DirInputDirective,
  DirAutoDirective,
  DirNumberPipe,
  DirectoTranslatePipe,
  LocalizePipe
} from 'ngx-directo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DirFlipDirective,
    DirInputDirective,
    DirAutoDirective,
    LocalizePipe,
    DirectoTranslatePipe,
    DirNumberPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  directo = inject(DirectoService);

  // Strategy 1: The 'Directo' Way (Object Mapping)
  dashboardTitle = {
    en: 'Directo Enterprise Showcase',
    ar: 'معرض Directo للمؤسسات'
  };

  // Strategy 2: The 'Core-Health' Way (Explicit Values)
  enValue = 'English (LTR) Context';
  arValue = 'سياق اللغة العربية (RTL)';

  // Complex Dynamic Item
  testItem = {
    nameEn: 'Localization SDK Dashboard',
    nameAr: 'لوحة تحكم SDK للترجمة',
    mixed: {
      enComment: 'This is an English comment in an Arabic UI.',
      arComment: 'هذا تعليق عربي في واجهة إنجليزية.'
    }
  };

  switchLanguage() {
    const nextLang = this.directo.currentLang() === 'en' ? 'ar' : 'en';
    this.directo.setLanguage(nextLang);
  }

  hydrateExternalData() {
    const externalArData = {
      HERO: { SUBTITLE: 'Data Hydrated Successfully from External Source' },
      FOOTER: { CREATED_BY: 'Powered By' }
    };

    this.directo.setTranslations('ar', externalArData);
    alert('SDK hydrated with external ar.json data!');
  }
}
