# Angular na przykładzie

Angular przede wszystkim porządkuje frontend. Zamiast pisać wszystko w jednym miejscu, dzielimy aplikację na komponenty. Każdy komponent ma swoją logikę, HTML i style. W aplikacji główny komponent zawiera tylko szkielet, a konkretny widok podmieniany jest przez router.

Routing w Angularze działa bez przeładowania strony. W projekcie, trasy do przepisów są ładowane leniwie, czyli dopiero wtedy, gdy użytkownik ich potrzebuje. To poprawia wydajność, bo aplikacja na starcie pobiera mniej kodu.

Dane pobierane są przez serwis. Komponent nie zna szczegółów API, tylko woła metody serwisu. Serwis trzyma stan w BehaviorSubject, a widok odbiera dane przez Observable i async pipe. Dzięki temu UI automatycznie reaguje na zmiany.

Formularz dodawania przepisu jest zrobiony jako Reactive Form. To oznacza, że Angular kontroluje stan pól, walidację i błędy. Mogę dynamicznie dodawać składniki przez FormArray, a formularz nie wyśle danych, jeśli są niepoprawne.

Całość działa na TypeScript, więc mam jasno zdefiniowane modele danych i mniej przypadkowych błędów. Najważniejsza rzecz, którą daje Angular, to przewidywalna architektura: wiadomo, gdzie jest widok, gdzie logika i gdzie komunikacja z backendem.

## 1. Czym jest Angular i dlaczego powstał

Angular czyli framework SPA (Single Page Application). W SPA przeglądarka nie przeładowuje całej strony przy każdym kliknięciu. Zamiast tego Angular podmienia tylko ten fragment interfejsu, który ma się zmienić.

Po co to jest ważne?

- aplikacja działa płynniej,
- łatwiej budować rozbudowane panele i systemy biznesowe,
- kod można podzielić na moduły funkcjonalne,
- łatwiej utrzymać porządek w większym zespole.

Angular daje gotowe mechanizmy, które rozwiązują typowe problemy frontendowe:

- komponenty do budowy widoków,
- router do nawigacji,
- serwisy do logiki i komunikacji z API,
- Dependency Injection do przekazywania zależności,
- Reactive Forms do formularzy,
- RxJS do reaktywnego przepływu danych,
- TypeScript do bezpieczeństwa typów.

## 14. Angular vs React

| Aspekt | Angular | React |
|--------|---------|-------|
| **Typ** | Full framework | Biblioteka (tylko widok) |
| **Architektura** | MVC/MVT z dużą ilością konwencji | Flex, komponentów i hook'ów |
| **Routing** | Wbudowany (`@angular/router`) | Osobne biblioteki (React Router) |
| **Formularze** | Reactive Forms, bardzo mocne i kontrolowane | Hook `useState`, mniej konwencji |
| **Zarządzanie stanem** | Services + RxJS/Observable | useState, useContext, lub Zustand/Redux |
| **Dependency Injection** | Wbudowany DI system | Nie ma, zwyczajnie importujesz |
| **Data binding** | Dwukierunkowe domyślnie (`[(ngModel)]`) | Jednokierunkowe (React jest bardziej „explicite") |
| **Reaktywność** | RxJS Observable + async pipe | React hooks (useState, useEffect) |
| **Nauka** | Większa krzywa uczenia się | Łatwiejsze na początek |
| **Ekosystem** | Monolityczny, wiele rzeczy „in the box" | Modularny, sam dobierasz biblioteki |
| **TypeScript** | Domyślnie i bardzo dobrze wspierany | Opcjonalnie, ale coraz bardziej wspieran |
| **Bundle size** | Duży (Angular sам jest ciężki) | Mniejszy niż Angular, ale zależy od bibliotek |
| **Wydajność** | Zależy od optymalizacji, ale solidna | Bardzo dobra, szczególnie przy proper memoization |
| **Community** | Silne, ale mniejsze niż React | Ogromne, bardzo wiele zasobów |
| **Kto używa** | Google, IBM, duże korporacje | Facebook, Netflix, Airbnb, większość startupów |
| **Najlepsze do** | Duże, skalowalne aplikacje biznesowe | Dynamicznych interfejsów, szybkich iteracji |

### Konkretne przykłady z naszej aplikacji

**Routing w Angularze:**
```ts
{
  path: 'recipes/:id',
  loadComponent: () => import('./recipe-detail/recipe-detail.component')
    .then(c => c.RecipeDetailComponent)
}
```

**Routing w React (React Router):**
```tsx
<Route path="recipes/:id" Component={RecipeDetail} />
```

**Formularze w Angularze:**
```ts
this.recipeForm = this.fb.group({
  name: ['', Validators.required],
  ingredients: this.fb.array([...])
});
```

**Formularze w React (z hook'iem):**
```tsx
const [recipe, setRecipe] = useState({ name: '', ingredients: [] });
const handleNameChange = (e) => setRecipe({ ...recipe, name: e.target.value });
```

**Observable w Angularze:**
```ts
recipes$ = this.recipeService.getAllRecipes();
// W HTML: *ngIf="recipes$ | async as recipes"
```

**Hook w React:**
```tsx
const [recipes, setRecipes] = useState([]);
useEffect(() => {
  recipeService.getAllRecipes().then(setRecipes);
}, []);
```

## 2. Start aplikacji: co dzieje się po uruchomieniu

Punkt wejścia aplikacji to plik `src/main.ts`:

```ts
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import 'zone.js';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(APP_ROUTES),
		provideHttpClient()
	]
}).catch(err => console.error(err));
```

Interpretacja krok po kroku:

1. Angular uruchamia aplikację od `AppComponent`.
2. Rejestruje router, żeby móc obsługiwać adresy URL.
3. Rejestruje `HttpClient`, żeby aplikacja mogła rozmawiać z backendem.
4. Dzięki temu od pierwszej sekundy działania masz gotową nawigację i komunikację API.

To jest bardzo charakterystyczne dla Angulara: na starcie deklarujesz „infrastrukturę aplikacji”, a później komponenty tylko z niej korzystają.

## 3. Komponenty: podstawowy „klocek” Angulara

W Angularze praktycznie każdy ekran to komponent. Komponent ma trzy warstwy:

- logikę (TypeScript),
- strukturę widoku (HTML),
- styl (SCSS/CSS).

Komponent główny w Twojej aplikacji:

```ts
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'Asian Cuisine Recipes';
}
```

Co to mówi o Angularze:

- `standalone: true` oznacza nowoczesny model bez obowiązkowego NgModule dla każdego komponentu,
- `imports` deklaruje, czego komponent potrzebuje (np. routera i dyrektyw),
- zmienna `title` jest częścią stanu komponentu i od razu może być użyta w HTML.

To podejście daje czytelność: każdy komponent jest „zamkniętą jednostką”, którą da się łatwo rozwijać i testować.

## 4. Routing i lazy loading: nawigacja bez przeładowania strony

Routing odpowiada za to, jaki komponent ma być widoczny pod danym adresem.

Trasy główne projektu:

```ts
export const APP_ROUTES: Routes = [
	{
		path: '',
		redirectTo: '/recipes',
		pathMatch: 'full'
	},
	{
		path: 'recipes',
		loadChildren: () => import('./features/recipes/recipes.routes').then(m => m.RECIPES_ROUTES)
	},
	{
		path: 'about',
		loadComponent: () => import('./features/about/about.component').then(c => c.AboutComponent)
	},
	{
		path: '**',
		redirectTo: '/recipes'
	}
];
```

Najważniejsze znaczenia:

- `redirectTo` ustawia domyślną stronę,
- `loadChildren` i `loadComponent` realizują lazy loading,
- `path: '**'` to zabezpieczenie na nieznane adresy.

Lazy loading to kluczowa cecha wydajnościowa Angulara: użytkownik pobiera tylko ten kod, który jest mu aktualnie potrzebny. To skraca czas pierwszego ładowania.

Trasy funkcji przepisów:

```ts
export const RECIPES_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(c => c.RecipesListComponent)
	},
	{
		path: 'create',
		loadComponent: () => import('./pages/recipe-form/recipe-form.component').then(c => c.RecipeFormComponent)
	},
	{
		path: ':id',
		loadComponent: () => import('./pages/recipe-detail/recipe-detail.component').then(c => c.RecipeDetailComponent)
	}
];
```

`':id'` to parametr trasy, czyli np. adres `/recipes/12` otwiera szczegóły przepisu o identyfikatorze `12`.

## 5. Szablony: jak Angular łączy dane z widokiem

W Angularze HTML nie jest „martwy”. To szablon, który żyje razem z logiką komponentu.

Podstawowe mechanizmy wiązania danych:

- interpolacja `{{ ... }}` wyświetla wartość,
- property binding `[prop]="..."` ustawia właściwości elementów,
- event binding `(event)="..."` reaguje na zdarzenia,
- dyrektywy `*ngIf` i `*ngFor` sterują strukturą widoku.

Przykład z nagłówka aplikacji:

```html
<h1 class="logo">
	<span class="emoji">🍜</span>
	{{ title }}
</h1>

<a routerLink="/recipes" class="nav-link">All Recipes</a>

<router-outlet></router-outlet>
```

Czyli w praktyce:

- `{{ title }}` pobiera dane z komponentu,
- `routerLink` robi nawigację bez odświeżania strony,
- `router-outlet` to miejsce, gdzie Angular „wstrzykuje” aktywny widok trasy.

Przykład interakcji i listy:

```html
<button
	*ngFor="let cuisine of cuisineList"
	[class.active]="selectedCuisine === cuisine"
	(click)="filterByCuisine(cuisine)"
	class="filter-btn"
>
	{{ cuisine }}
</button>
```

Przykład renderowania danych reaktywnych:

```html
<div class="recipes-grid" *ngIf="recipes$ | async as recipes; else loading">
	<div
		*ngFor="let recipe of filteredRecipes; trackBy: trackByRecipeId"
		class="recipe-card"
	>
		<img
			[src]="recipe.imageUrl || fallbackImage"
			[alt]="recipe.name"
			(error)="onImageError($event)"
			class="recipe-image"
		>
	</div>
</div>
```

Najważniejszy wniosek: widok jest deklaracją tego, jak ma wyglądać UI dla aktualnego stanu danych.

## 6. Serwisy i Dependency Injection: porządek w logice

W dobrze zorganizowanym Angularze komponent nie powinien zawierać całej logiki biznesowej ani szczegółów API. Od tego są serwisy.

Serwis projektu:

```ts
@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	private apiUrl = `${environment.apiUrl}/recipes`;

	private recipesSubject = new BehaviorSubject<Recipe[]>([]);
	public recipes$ = this.recipesSubject.asObservable();

	constructor(private http: HttpClient) {
		this.loadRecipes();
	}
}
```

W praktyce:

- `providedIn: 'root'` tworzy jeden wspólny egzemplarz serwisu w całej aplikacji,
- `HttpClient` jest dostarczony przez Angular DI,
- adres backendu pobierasz z konfiguracji środowiska,
- serwis ma własny stan danych (`BehaviorSubject`) i udostępnia go jako strumień.

Wstrzyknięcie serwisu w komponencie:

```ts
constructor(private recipeService: RecipeService) {}
```

To podejście daje duży plus przy utrzymaniu projektu: zmieniasz logikę API w jednym miejscu, a nie w kilku komponentach.

## 7. Reaktywność: Observable + BehaviorSubject + async pipe

To jeden z najważniejszych fundamentów Angulara w aplikacjach danych.

Flow projektu:

1. Serwis pobiera dane z backendu (`HttpClient`).
2. Wynik zapisuje do `BehaviorSubject`.
3. Komponent pobiera `Observable` (`recipes$`).
4. HTML używa `async pipe`, który renderuje dane i sam zarządza subskrypcją.

Fragment pobierania danych:

```ts
private loadRecipes(): void {
	this.http.get<Recipe[]>(this.apiUrl).subscribe(
		(recipes) => {
			this.recipesSubject.next(recipes);
		},
		(error) => {
			console.error('Error loading recipes:', error);
		}
	);
}
```

Udostępnienie strumienia w komponencie listy:

```ts
recipes$ = this.recipeService.getAllRecipes();
```

Renderowanie przez `async`:

```html
<div class="recipes-grid" *ngIf="recipes$ | async as recipes; else loading">
```

Dlaczego to podejście jest dobre:

- dane i widok są zsynchronizowane,
- mniej ręcznego kodu do obsługi subskrypcji,
- łatwiej rozszerzyć aplikację o kolejne źródła danych i stany.

## 8. Reactive Forms: formularz jako kontrolowany model

W aplikacji tworzenia przepisu jest przykładem pełnego, reaktywnego podejścia.

Definicja formularza:

```ts
this.recipeForm = this.fb.group({
	name: ['', [Validators.required, Validators.minLength(3)]],
	cuisine: ['', Validators.required],
	description: ['', [Validators.required, Validators.minLength(10)]],
	difficulty: ['easy', Validators.required],
	prepTime: ['', [Validators.required, Validators.min(0)]],
	cookTime: ['', [Validators.required, Validators.min(0)]],
	servings: ['', [Validators.required, Validators.min(1)]],
	imageUrl: [''],
	instructions: ['', [Validators.required, Validators.minLength(20)]],
	ingredients: this.fb.array([
		this.fb.control('', Validators.required)
	])
});
```

Podłączenie formularza do szablonu:

```html
<form [formGroup]="recipeForm" (ngSubmit)="onSubmit()" class="recipe-form">
```

Dynamiczna lista składników przez `FormArray`:

```html
<div formArrayName="ingredients">
	<div
		*ngFor="let ingredient of ingredients.controls; let i = index"
		class="ingredient-input-group"
	>
		<input
			type="text"
			class="form-control"
			[formControlName]="i"
			placeholder="e.g., 2 cups of rice noodles"
		>
	</div>
</div>
```

Walidacja przed wysłaniem:

```ts
if (this.recipeForm.invalid) {
	this.recipeForm.markAllAsTouched();
	return;
}
```

Najważniejsza idea: formularz ma własny stan, który Angular kontroluje centralnie. Dzięki temu łatwo wyświetlać błędy, blokować wysyłkę i walidować dane jeszcze przed wywołaniem API.

## 9. Cykl życia komponentu i parametry trasy

Hook `ngOnInit` uruchamia się po inicjalizacji komponentu. To typowe miejsce do pobrania danych wejściowych i wykonania pierwszego zapytania.

W komponencie szczegółu przepisu:

```ts
ngOnInit(): void {
	this.route.params.subscribe(
		(params: any) => {
			const id = params['id'];
			this.loadRecipe(id);
		}
	);
}
```

To realizuje prosty i skuteczny scenariusz:

- użytkownik wchodzi na adres z `:id`,
- Angular odczytuje parametr,
- komponent pobiera właściwy rekord,
- widok pokazuje ładowanie, wynik albo błąd.

## 10. TypeScript i kontrakt danych

Angular opiera się o TypeScript, a więc o jawne typy.

Model przepisu w serwisie:

```ts
export interface Recipe {
	id: number;
	name: string;
	cuisine: string;
	description: string;
	ingredients: string[];
	instructions: string;
	difficulty: 'easy' | 'medium' | 'hard';
	prepTime: number;
	cookTime: number;
	servings: number;
	imageUrl?: string;
	createdAt?: string;
	updatedAt?: string;
}
```

To jest „umowa” między frontendem a backendem. Jeśli backend zwróci dane w złym formacie, łatwiej to wykryć wcześniej.

## 11. Pipes: prezentacja danych bez mieszania logiki

Pipes służą do formatowania danych w samym szablonie.

Przykłady z kodu:

```html
{{ recipe.difficulty | uppercase }}
{{ recipe.createdAt | date:'short' }}
```

Dzięki temu logika komponentu pozostaje czysta, a formatowanie jest deklaratywne i łatwe do czytania.

## 12. Przepływ „od kliknięcia do danych” w aplikacji

Idea Angulara:

1. Użytkownik klika link `routerLink`, np. przejście do listy lub szczegółu przepisu.
2. Router aktywuje odpowiedni komponent i renderuje go w `router-outlet`.
3. Komponent przez DI korzysta z `RecipeService`.
4. Serwis wykonuje zapytanie HTTP.
5. Odpowiedź trafia do `BehaviorSubject`.
6. Szablon (z `async pipe`) dostaje nowe dane i od razu odświeża UI.

Czyli siła Angulara to przewidywalny przepływ danych i odpowiedzialności.

## 13. Co warto zapamiętać jako „esencję Angulara”

Widzimy, że Angular:

- narzuca czytelną strukturę projektu,
- oddziela warstwę widoku od logiki i danych,
- wspiera skalowanie aplikacji przez routing i lazy loading,
- daje mocne narzędzia do formularzy,
- promuje reaktywny model pracy z danymi,
- ułatwia rozwój zespołowy dzięki konsekwentnym wzorcom.

Angular jest świetny tam, gdzie aplikacja ma być większa, długowieczna i rozwijana przez więcej niż jedną osobę.
