import { TestBed } from '@angular/core/testing';
import { DirectoService } from './directo.service';
import { DIRECTO_CONFIG } from '../models/directo.config';

describe('DirectoService', () => {
  let service: DirectoService;

  const mockConfig = {
    languages: {
      en: { direction: 'ltr', fontFamily: 'Inter' },
      ar: { 
        direction: 'rtl', 
        fontFamily: 'Cairo',
        translations: {
          WIDGET: { TITLE: 'العنوان' }
        }
      }
    },
    defaultLang: 'en'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DirectoService,
        { provide: DIRECTO_CONFIG, useValue: mockConfig }
      ]
    });
    service = TestBed.inject(DirectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with the default language', () => {
    expect(service.currentLang()).toBe('en');
    expect(service.isRtl()).toBe(false);
  });

  it('should update state when switching languages', () => {
    service.setLanguage('ar');
    expect(service.currentLang()).toBe('ar');
    expect(service.isRtl()).toBe(true);
  });

  it('should correctly resolve nested translations', () => {
    service.setLanguage('ar');
    const result = service.translate('WIDGET.TITLE');
    expect(result).toBe('العنوان');
  });

  it('should return the key if translation is not found', () => {
    const result = service.translate('NON_EXISTENT_KEY');
    expect(result).toBe('NON_EXISTENT_KEY');
  });
  
  it('should support interpolation with placeholders', () => {
    service.setTranslations('en', { GREET: 'Hello {{name}}' });
    const result = service.translate('GREET', { name: 'Ahmad' });
    expect(result).toBe('Hello Ahmad');
  });

  it('should support multiple placeholders and handle efficiency', () => {
    service.setTranslations('en', { MULTI: 'User {{first}} {{last}} has ID {{id}}' });
    const result = service.translate('MULTI', { first: 'Ahmad', last: 'Alhafi', id: 42 });
    expect(result).toBe('User Ahmad Alhafi has ID 42');
  });

  it('should ignore placeholders if no params provided', () => {
    service.setTranslations('en', { GREET: 'Hello {{name}}' });
    const result = service.translate('GREET');
    expect(result).toBe('Hello {{name}}');
  });

  it('should handle spaces in placeholders via trim', () => {
    service.setTranslations('en', { GREET: 'Hello {{  name  }}' });
    const result = service.translate('GREET', { name: 'Ahmad' });
    expect(result).toBe('Hello Ahmad');
  });
});
