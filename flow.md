# 📐 Struktura Projektu Angular

## 🗂️ Ogólna Struktura

```
angular_app/
├── src/                          # Kod źródłowy aplikacji
│   ├── app/                      # Główny folder aplikacji
│   ├── environments/             # Konfiguracje (dev/prod)
│   ├── assets/                   # Zasoby statyczne
│   ├── styles.scss               # Style globalne
│   ├── main.ts                   # Bootstrap aplikacji
│   └── index.html                # Punkt wejścia HTML
├── backend/                      # API (FastAPI w Pythonie)
├── angular.json                  # Konfiguracja Angular CLI
├── tsconfig.json                 # Konfiguracja TypeScript
└── package.json                  # Zależności npm
```

---

## 🎯 Najważniejsze Części Projektu

### 1. **app.routes.ts** — Routing aplikacji
- Główna konfiguracja tras (routing)
- Lazy loading sekcji `recipes`
- Definiuje ścieżki: `/recipes`, `/about`

### 2. **`src/app/app.component.ts/html/scss`** — Root Component
- Główny komponent aplikacji
- Zawiera `<router-outlet>` — gdzie wyświetlają się inne komponenty
- Layout aplikacji (nawigacja, struktury ogólne)

### 3. **recipe.service.ts** — Serwis API ⭐
Kluczowy serwis! Tutaj:
- HTTP komunikacja z backendem (`GET`, `POST`, `PUT`, `DELETE`)
- Observables — dane płyną reaktywnie
- Wszystkie operacje na przepisach
- Dependency Injection — dostęp z każdego komponentu

### 4. **recipes** — Feature Moduł Przepisów
Struktura:
```
recipes/
├── recipes.routes.ts              # Routing dla tej sekcji
└── pages/
    ├── recipes-list/              # Lista wszystkich przepisów
    ├── recipe-detail/:id           # Szczegóły jednego przepisu
    └── recipe-form/                # Formularz do tworzenia
```

**recipes-list**: Wyświetla tabelę/listę, filtry
**recipe-detail**: Wyświetla szczegóły + opcje edycji/usunięcia
**recipe-form**: Reactive Forms — dodawanie nowych przepisów

### 5. **about** — O Projekcie
- Informacyjna strona
- Opisuje Angular koncepty

---

## 💡 Ważne Koncepty w Twoim Projekcie

| Koncepcja | Gdzie | Co robi |
|-----------|-------|---------|
| **Standalone Components** | Każdy komponent ma `standalone: true` | Nowoczesny Angular (bez NgModules) |
| **Lazy Loading** | `app.routes.ts` | Sekcja `recipes` ładuje się tylko gdy jej potrzebujesz |
| **Reactive Forms** | `recipe-form.component.ts` | Zaawansowany formularz z dynamiczną tablicą składników |
| **Services** | `recipe.service.ts` | Obsługuje wszystkie HTTP requesty |
| **Observables** | `recipe.service.ts` + komponenty | Dane aktualizują się reaktywnie |
| **Template Binding** | `.html` pliki | `{{ }}`, `[property]`, `(event)`, `[(ngModel)]` |
| **Directives** | `*ngIf`, `*ngFor` | Warunkowe i powtarzalne elementy HTML |

---

## 🔌 Jak Się Łączy?

```
User klika na stronę
    ↓
app.routes.ts kieruje do właściwego komponentu
    ↓
Komponent importuje RecipeService (Dependency Injection)
    ↓
RecipeService robi HTTP GET do backendu (FastAPI)
    ↓
Backend zwraca JSON z przepisami
    ↓
Observable emituje dane
    ↓
Komponent otrzymuje dane i wyświetla w HTML (template binding)
    ↓
User widzi przepisy na ekranie
```

---

## 📊 Przepływ Danych (Recipe-List jako przykład)

**recipes-list.component.ts:**
```typescript
constructor(private recipeService: RecipeService) {}

ngOnInit() {
  // Subskrybuje na Observable z serwisu
  this.recipes$ = this.recipeService.getRecipes();
}
```

**recipes-list.component.html:**
```html
<li *ngFor="let recipe of recipes$ | async">
  <!-- async pipe subskrybuje automatycznie -->
  {{ recipe.name }}
</li>
```

---

## ⚙️ Backend (Python/FastAPI)

Znajduje się w main.py:
- API endpoints: `GET /api/recipes`, `POST /api/recipes`, itd.
- Swagger UI: `http://localhost:8000/docs`
- CORS skonfigurowany dla Angulara

---

## 🎓 Podsumowanie — Najważniejsze Pliki do Zrozumienia

1. ✅ **`recipe.service.ts`** — Serce komunikacji z API
2. ✅ **`app.routes.ts`** — Jak router kieruje użytkownika
3. ✅ **`recipe-form.component.ts`** — Jak działają Reactive Forms
4. ✅ **`recipes-list.component.html`** — Jak wyświetlać dane z Observable
5. ✅ **main.py** — Jak działa API
