<p align="center">
  <img src="https://raw.githubusercontent.com/ahmaed0hakam/ngx-directo/main/projects/directo/directo_banner.png" alt="Directo / NG Banner" width="100%">
</p>

# ngx-directo

[![NPM Version](https://img.shields.io/npm/v/ngx-directo.svg?style=flat-square)](https://www.npmjs.com/package/ngx-directo)
[![License](https://img.shields.io/npm/l/ngx-directo.svg?style=flat-square)](https://github.com/ahmaed0hakam/ngx-directo/blob/main/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ngx-directo?style=flat-square)](https://bundlephobia.com/package/ngx-directo)
[![Angular Version](https://img.shields.io/badge/Angular-18%2B-DD0031.svg?style=flat-square&logo=angular)](https://angular.dev/)

**The ultimate Angular 18+ Signals-based library for RTL/LTR directionality, Arabic localization, and Google Font orchestration. Zoneless-ready and high-performance.**

---

ngx-directo is a high-performance, lightweight Angular library for managing bi-directional (RTL/LTR) layouts, dynamic font orchestration, and localized UI state. Built for the modern web, it is fully zoneless-ready and powered by fine-grained Signals.

---

## ⚡ Quick Start

### 1. Install
```bash
npm install ngx-directo
```

### 2. Configure (One-liner)
Add it to your `app.config.ts`. Directo is **Zero-Config by default**, supporting English and Arabic out of the box.

```typescript
providers: [
  provideDirecto() 
]
```

---

## 🚀 Directives

### [dirAuto] - Intelligent Script Detection
Detects the direction of content (RTL/LTR) automatically using first-strong-character logic.
```html
<p [dirAuto]="dynamicText">{{ dynamicText }}</p>
```

### [dirFlip] - RTL Mirroring
Flips icons or elements horizontally only when the app is in RTL mode.
```html
<i dirFlip class="pi pi-chevron-right"></i>
```

### [dirOnly] - Conditional Rendering
Conditionally renders elements based on the active direction.
```html
<div dirOnly="rtl">Only visible in RTL mode</div>
```

---

## 💎 Pipes

| Pipe | Description | Example |
| :--- | :--- | :--- |
| **localize** | Multi-strategy localization (Value, Object, or Key). | `{{ enVal \| localize : arVal }}` |
| **directoTranslate** | Dot-notation string translation. | `{{ 'HOME.WELCOME' \| directoTranslate }}` |
| **dirMirror** | Swaps directional keywords (left <-> right). | `{{ 'chevron-right' \| dirMirror }}` |
| **dirNumber** | Transforms digits to native script (0-9 -> ٠-٩). | `{{ 2026 \| dirNumber }}` |

---

## 🧠 Intelligent Mapping
Directo includes a built-in **RTL Registry**. If you call `directo.setLanguage('ar')`, it automatically knows it's an RTL language and swaps your layout instantly—even with zero custom configuration.

---

## ⚙️ Advanced Configuration & Hydration

For production apps requiring external JSON loading or custom Google Fonts:

```typescript
provideDirecto({
  languages: {
    ar: { 
      direction: 'rtl', 
      fontFamily: 'Cairo, sans-serif', 
      googleFontName: 'Cairo',
      localizeDigits: true
    },
    en: { direction: 'ltr', fontFamily: 'Inter', googleFontName: 'Inter' }
  },
  defaultLang: 'en'
}),

// Optional: Hydrate from external JSON during app bootstrap
{
  provide: APP_INITIALIZER,
  useFactory: () => {
    const directo = inject(DirectoService);
    const http = inject(HttpClient);
    return () => firstValueFrom(
      http.get(`/assets/i18n/${directo.currentLang()}.json`).pipe(
        tap(data => directo.setTranslations(directo.currentLang(), data))
      )
    );
  },
  multi: true
}
```

---

## 🧱 Zero-JS Directional Logic
Injects reactive CSS variables into `:root` for high-performance SCSS animations:
* `--dir-sign`: `1` (LTR), `-1` (RTL)
* `--dir-align`: `left` (LTR), `right` (RTL)

```scss
.sidebar {
  transform: translateX(calc(var(--dir-sign) * -100%)); 
}
```

---

## Authorship and License
Copyright (c) 2026 **Ahmad Alhafi**. All rights reserved.
MIT License
