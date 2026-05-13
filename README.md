# 🍜 Asian Cuisine Recipes - Full-Stack Web Application

A complete full-stack web application showcasing **Angular best practices** with a **FastAPI backend**. This project demonstrates how to build a modern, scalable web application with proper architecture, clean code, and comprehensive documentation.

## 🎯 Project Overview

This is an educational project that teaches Angular fundamentals through a real-world application. Users can browse, filter, create, and manage Asian cuisine recipes.

**Theme:** Asian Cuisine Recipes
**Frontend:** Angular 17 (Standalone Components)
**Backend:** FastAPI (Python)
**Styling:** SCSS with responsive design

---

## ✨ Features

### Frontend (Angular)
- ✅ **Lazy Loading** - Routes load on demand for better performance
- ✅ **Reactive Forms** - Complex form with dynamic ingredients array
- ✅ **Services & DI** - Proper separation of concerns with services
- ✅ **Observables** - RxJS patterns for reactive programming
- ✅ **Routing** - Multi-page navigation without full page reload
- ✅ **Directives** - *ngIf, *ngFor, ngClass for dynamic templates
- ✅ **Standalone Components** - Modern Angular architecture
- ✅ **Responsive Design** - Mobile-friendly UI with SCSS

### Backend (FastAPI)
- ✅ **RESTful API** - Proper endpoint design
- ✅ **Type Safety** - Pydantic models for validation
- ✅ **CORS** - Configured for frontend communication
- ✅ **API Documentation** - Automatic Swagger UI at /docs
- ✅ **Error Handling** - Proper HTTP status codes

### Pages & Routes
- `/recipes` - Browse all recipes with filtering
- `/recipes/:id` - View detailed recipe
- `/recipes/create` - Create new recipe (reactive form)
- `/about` - Learn about the app and Angular concepts

---

## 📁 Project Structure

```
angular_app/
├── src/
│   ├── app/
│   │   ├── app.component.*           # Root component
│   │   ├── app.routes.ts              # Application routing config
│   │   ├── services/
│   │   │   └── recipe.service.ts      # API service (HTTP, observables)
│   │   └── features/
│   │       ├── recipes/               # Recipes feature (lazy loaded)
│   │       │   ├── pages/
│   │       │   │   ├── recipes-list/      # List all recipes
│   │       │   │   ├── recipe-detail/     # View single recipe
│   │       │   │   └── recipe-form/       # Create recipe (forms)
│   │       │   └── recipes.routes.ts      # Feature routing
│   │       └── about/                 # About feature
│   ├── environments/                  # Configuration
│   ├── styles.scss                    # Global styles
│   ├── main.ts                        # App bootstrap
│   └── index.html                     # HTML entry point
├── backend/
│   ├── main.py                        # FastAPI application
│   └── requirements.txt                # Python dependencies
├── run.md                             # ⭐ How to run the project
├── explanation.md                     # ⭐ Angular concepts explained
└── package.json                       # Frontend dependencies
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org))
- Python 3.9+ ([Download](https://www.python.org))

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Start Backend (Terminal 1)

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

### 3. Start Frontend (Terminal 2)

```bash
npm start
```

### 4. Open Browser

Visit `http://localhost:4200` 🎉

For detailed instructions, see [run.md](run.md)

---

## 📚 Learning Guide

This project is perfect for learning Angular! Here's what's demonstrated:

### Angular Concepts

| Concept | Files | Learn About |
|---------|-------|------------|
| **Components** | `app.component.ts`, `recipes-list.component.ts` | Building reusable UI blocks |
| **Routing** | `app.routes.ts`, `recipes.routes.ts` | Multi-page navigation |
| **Dependency Injection** | `recipe.service.ts` | Service patterns and inversion of control |
| **Services** | `recipe.service.ts` | Sharing data and logic |
| **HTTP Client** | `recipe.service.ts` | API communication |
| **Observables** | `recipe.service.ts`, components | Reactive programming |
| **Forms** | `recipe-form.component.ts` | User input handling |
| **Directives** | Templates (`*.html`) | Dynamic template rendering |
| **Lifecycle Hooks** | `ngOnInit`, `ngOnDestroy` | Component initialization |
| **Styling** | SCSS files | Professional CSS organization |

### Start Learning Here

1. **Read** [explanation.md](explanation.md) - Comprehensive guide to Angular concepts
2. **Explore** the code - Open any component and read the comments
3. **Modify** - Change styles, add features, experiment
4. **Debug** - Use browser DevTools to inspect Angular

---

## 🎨 Angular Features Demonstrated

### 1. Standalone Components

Modern Angular approach - no modules needed:

```typescript
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink]
})
```

### 2. Reactive Forms

Complex form handling with validation:

```typescript
this.form = this.fb.group({
  name: ['', [Validators.required]],
  ingredients: this.fb.array([...])  // Dynamic array
});
```

### 3. Services with Observables

```typescript
// Provide app-wide singleton
@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes$ = this.http.get<Recipe[]>(url);
}
```

### 4. Routing with Lazy Loading

```typescript
{
  path: 'recipes',
  loadChildren: () => import('./recipes/recipes.routes')
    .then(m => m.RECIPES_ROUTES)
}
```

### 5. Template Binding

```html
<!-- Property binding -->
<img [src]="recipe.imageUrl">

<!-- Event binding -->
<button (click)="deleteRecipe(id)">Delete</button>

<!-- Two-way binding -->
<input [(ngModel)]="searchText">

<!-- Interpolation -->
<h1>{{ title }}</h1>

<!-- Structural directives -->
<div *ngIf="isLoading">Loading...</div>
<li *ngFor="let item of items">{{ item }}</li>
```

---

## 🔌 API Endpoints

Backend is a FastAPI application with comprehensive REST API:

```
GET    /api/recipes              # Get all recipes
GET    /api/recipes/:id          # Get specific recipe
POST   /api/recipes              # Create recipe
PUT    /api/recipes/:id          # Update recipe
DELETE /api/recipes/:id          # Delete recipe
GET    /api/recipes/cuisine/:name # Filter by cuisine
GET    /api/health               # Health check
```

### API Documentation

When backend is running:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 🛠️ Development

### Build for Production

```bash
# Frontend
npm run build
# Output: dist/asian-recipes-app/

# Backend
# Use production ASGI server (gunicorn, etc.)
```

### Run Tests

```bash
# Frontend tests
npm test

# Run linter
npm lint
```

### Code Quality

All code is commented at important sections to explain:
- Angular patterns
- Component architecture
- Service design
- Form handling
- HTTP communication

---

## 📖 Documentation

- **[run.md](run.md)** - Complete setup and running instructions
- **[explanation.md](explanation.md)** - Angular concepts with code examples
- **Code Comments** - Important sections have detailed comments

---

## 🎓 Key Learning Points

By studying this project, you'll learn:

1. **Architecture** - Feature-based modular structure
2. **Best Practices** - Proper component organization
3. **Reactive Programming** - Observables and RxJS patterns
4. **Forms** - Reactive forms with validation
5. **HTTP Communication** - How to call APIs
6. **Styling** - Professional SCSS organization
7. **Performance** - Lazy loading and change detection
8. **Full Stack** - Frontend-backend integration

---

## 🔍 Code Quality

✅ **Well Commented** - Important sections have detailed explanations
✅ **Clean Architecture** - Proper separation of concerns
✅ **Type Safe** - Full TypeScript with strict mode
✅ **Responsive** - Works on desktop and mobile
✅ **Accessible** - Semantic HTML and ARIA labels

---

## 🚀 Next Steps

1. ✅ Run the application (see [run.md](run.md))
2. ✅ Read the Angular explanation (see [explanation.md](explanation.md))
3. ✅ Explore the code - read comments carefully
4. ✅ Modify a component - add a new feature
5. ✅ Create a new page - test your understanding
6. ✅ Deploy to cloud - use Azure or similar

---

## 📚 Resources

- [Angular Official Docs](https://angular.io)
- [FastAPI Official Docs](https://fastapi.tiangolo.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)

---

## 🤝 Contributing

This is an educational project. Feel free to fork, modify, and learn!

## 📄 License

MIT License - Feel free to use this project for learning

---

## 👨‍💻 Author

Created as a comprehensive Angular learning project demonstrating modern web development practices.

---

**Happy Learning! 🎉**
