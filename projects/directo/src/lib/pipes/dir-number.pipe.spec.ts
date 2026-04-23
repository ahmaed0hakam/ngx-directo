import { TestBed } from '@angular/core/testing';
import { DirNumberPipe } from './dir-number.pipe';
import { DirectoService } from '../services/directo.service';
import { DIRECTO_CONFIG } from '../models/directo.config';

describe('DirNumberPipe', () => {
  let pipe: DirNumberPipe;
  let service: DirectoService;

  const mockConfig = {
    languages: {
      en: { direction: 'ltr', fontFamily: 'Inter', localizeDigits: false },
      ar: { direction: 'rtl', fontFamily: 'Cairo', localizeDigits: true }
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
    pipe = new DirNumberPipe();
    // Inject service into pipe manually since it's not provided by DI in the constructor for pipes 
    // unless used in a component, but we can mock it.
    (pipe as any).directo = service;
  });

  it('should return Western digits when useNativeDigits is false', () => {
    service.setLanguage('en');
    expect(pipe.transform(2026)).toBe('2026');
  });

  it('should return Arabic-Indic digits when useNativeDigits is true', () => {
    service.setLanguage('ar');
    expect(pipe.transform(2026)).toBe('٢٠٢٦');
  });

  it('should handle null values gracefully', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
