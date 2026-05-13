import { Routes } from '@angular/router';

/**
 * APPLICATION ROUTES - Defines all navigation paths
 * Angular Characteristic: Lazy Loading - components are loaded on demand
 * This reduces initial bundle size and improves performance
 */
export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    // Lazy load recipe module - only loads when user navigates to /recipes
    path: 'recipes',
    loadChildren: () => import('./features/recipes/recipes.routes').then(m => m.RECIPES_ROUTES)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(c => c.AboutComponent)
  },
  {
    // Wildcard route - catches undefined routes
    path: '**',
    redirectTo: '/recipes'
  }
];
