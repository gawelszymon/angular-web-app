import { Routes } from '@angular/router';

/**
 * RECIPES FEATURE ROUTES - Child routes for recipes
 * These routes are lazy-loaded when user navigates to /recipes
 * Feature modules organize code by domain/feature
 */
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
