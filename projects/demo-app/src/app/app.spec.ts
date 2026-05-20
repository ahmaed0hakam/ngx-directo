import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideDirecto } from 'ngx-directo';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideDirecto({
          languages: {
            en: { direction: 'ltr', fontFamily: 'Inter' },
            ar: { direction: 'rtl', fontFamily: 'Cairo' }
          },
          defaultLang: 'en'
        })
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Directo Enterprise Showcase');
  });
});
