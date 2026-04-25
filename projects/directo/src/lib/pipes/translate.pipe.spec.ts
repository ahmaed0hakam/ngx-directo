import { TestBed } from '@angular/core/testing';
import { DirectoTranslatePipe } from './translate.pipe';
import { DirectoService } from '../services/directo.service';
import { DIRECTO_CONFIG } from '../models/directo.config';

describe('DirectoTranslatePipe', () => {
  let pipe: DirectoTranslatePipe;
  let service: DirectoService;

  const mockConfig = {
    languages: {
      en: { 
        direction: 'ltr', 
        fontFamily: 'Inter',
        translations: {
          GREET: 'Hello {{name}}',
          ITEMS: 'Showing {{count}} items'
        }
      },
      ar: { 
        direction: 'rtl', 
        fontFamily: 'Cairo',
        translations: {
          GREET: 'مرحباً {{name}}'
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
    
    // Use runInInjectionContext because pipe uses inject()
    TestBed.runInInjectionContext(() => {
        pipe = new DirectoTranslatePipe();
    });
  });

  it('should translate correctly with no params', () => {
    expect(pipe.transform('GREET')).toBe('Hello {{name}}');
  });

  it('should translate with params object', () => {
    expect(pipe.transform('GREET', { name: 'Ahmad' })).toBe('Hello Ahmad');
  });

  it('should support forcing a language as second argument', () => {
    expect(pipe.transform('GREET', 'ar')).toBe('مرحباً {{name}}');
  });

  it('should support params AND forcing a language', () => {
    expect(pipe.transform('GREET', { name: 'أحمد' }, 'ar')).toBe('مرحباً أحمد');
  });

  it('should handle multiple placeholders across different calls', () => {
    expect(pipe.transform('ITEMS', { count: 5 })).toBe('Showing 5 items');
    expect(pipe.transform('ITEMS', { count: 10 })).toBe('Showing 10 items');
  });

  it('should return empty string for empty key', () => {
    expect(pipe.transform('')).toBe('');
  });
});
