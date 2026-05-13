import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * RECIPE SERVICE - Handles all recipe-related API calls
 * Angular Characteristic: Services for code reuse and separation of concerns
 * Services are singletons - only one instance exists throughout the app
 * This pattern follows the Single Responsibility Principle
 */
@Injectable({
  providedIn: 'root' // Provides this service at the root level (singleton)
})
export class RecipeService {
  // API endpoint from environment configuration
  private apiUrl = `${environment.apiUrl}/recipes`;

  // BehaviorSubject - Angular way to manage reactive state
  // Components subscribe to changes and react automatically
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  public recipes$ = this.recipesSubject.asObservable(); // $ suffix convention for Observables

  constructor(private http: HttpClient) {
    this.loadRecipes();
  }

  /**
   * Load all recipes from the backend
   * HTTP calls return Observables - enables reactive programming
   */
  private loadRecipes(): void {
    this.http.get<Recipe[]>(this.apiUrl).subscribe(
      (recipes) => {
        this.recipesSubject.next(recipes); // Update the BehaviorSubject
      },
      (error) => {
        console.error('Error loading recipes:', error);
      }
    );
  }

  /**
   * Get a single recipe by ID
   * Returns Observable - caller decides when to subscribe
   */
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get all recipes
   * Returns Observable from BehaviorSubject
   */
  getAllRecipes(): Observable<Recipe[]> {
    return this.recipes$;
  }

  /**
   * Create a new recipe
   * POST request to backend API
   */
  createRecipe(recipe: Partial<Recipe>): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe).pipe(
      tap((createdRecipe) => {
        const currentRecipes = this.recipesSubject.value;
        this.recipesSubject.next([...currentRecipes, createdRecipe]);
      })
    );
  }

  /**
   * Update an existing recipe
   * PUT request to update specific recipe
   */
  updateRecipe(id: number, recipe: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }

  /**
   * Delete a recipe
   * DELETE request to remove recipe from backend
   */
  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentRecipes = this.recipesSubject.value;
        this.recipesSubject.next(currentRecipes.filter((recipe) => recipe.id !== id));
      })
    );
  }

  /**
   * Refresh recipes from server
   * Called when data might have changed
   */
  refresh(): void {
    this.loadRecipes();
  }
}

/**
 * Recipe Model/Interface
 * Defines the structure of recipe data
 * TypeScript interfaces provide type safety
 */
export interface Recipe {
  id: number;
  name: string;
  cuisine: string; // e.g., 'Chinese', 'Thai', 'Japanese'
  description: string;
  ingredients: string[];
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
