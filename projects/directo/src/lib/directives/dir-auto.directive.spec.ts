import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirAutoDirective } from './dir-auto.directive';
import { DirectoService } from '../services/directo.service';
import { DIRECTO_CONFIG } from '../models/directo.config';

@Component({
  standalone: true,
  imports: [DirAutoDirective],
  template: `
    <div id="en-box" [dirAuto]="enText"></div>
    <div id="ar-box" [dirAuto]="arText"></div>
    <div id="magic-box" dirAuto>{{ magicText }}</div>
  `
})
class TestHostComponent {
  enText = 'Hello World';
  arText = 'مرحبا بالعالم';
  magicText = 'English First';
}

describe('DirAutoDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  const mockConfig = {
    languages: {
      en: { direction: 'ltr', fontFamily: 'Inter' }
    },
    defaultLang: 'en'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DirAutoDirective],
      providers: [
        DirectoService,
        { provide: DIRECTO_CONFIG, useValue: mockConfig }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set dir="ltr" for English input', () => {
    const el = fixture.nativeElement.querySelector('#en-box');
    expect(el.getAttribute('dir')).toBe('ltr');
  });

  it('should set dir="rtl" for Arabic input', () => {
    const el = fixture.nativeElement.querySelector('#ar-box');
    expect(el.getAttribute('dir')).toBe('rtl');
  });

  it('should react to magic innerText changes', async () => {
    const el = fixture.nativeElement.querySelector('#magic-box');
    expect(el.getAttribute('dir')).toBe('ltr');

    component.magicText = 'مرحبا';
    fixture.detectChanges();
    
    // Wait for MutationObserver to kick in (simulated here)
    // In a real browser this would be async, in JSDOM it might be instant
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(el.getAttribute('dir')).toBe('rtl');
  });
});
