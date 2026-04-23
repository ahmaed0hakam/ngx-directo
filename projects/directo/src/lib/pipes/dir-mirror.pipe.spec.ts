import { TestBed } from '@angular/core/testing';
import { DirMirrorPipe } from './dir-mirror.pipe';
import { DirectoService } from '../services/directo.service';
import { DIRECTO_CONFIG } from '../models/directo.config';

describe('DirMirrorPipe', () => {
  let pipe: DirMirrorPipe;
  let service: DirectoService;

  const mockConfig = {
    languages: {
      en: { direction: 'ltr', fontFamily: 'Inter' },
      ar: { direction: 'rtl', fontFamily: 'Cairo' }
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
    pipe = new DirMirrorPipe();
    (pipe as any).directo = service;
  });

  it('should not mirror in LTR mode', () => {
    service.setLanguage('en');
    expect(pipe.transform('chevron-right')).toBe('chevron-right');
  });

  it('should swap right/left in RTL mode', () => {
    service.setLanguage('ar');
    expect(pipe.transform('chevron-right')).toBe('chevron-left');
    expect(pipe.transform('margin-left')).toBe('margin-right');
  });

  it('should swap next/prev in RTL mode', () => {
    service.setLanguage('ar');
    expect(pipe.transform('next-page')).toBe('prev-page');
  });
});
