import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe, RecipeService } from '../../../../services/recipe.service';

/**
 * RECIPES LIST COMPONENT - Displays all recipes
 * Angular Characteristics demonstrated:
 * 1. Component lifecycle (OnInit)
 * 2. Dependency Injection (RecipeService)
 * 3. Async pipe for reactive data
 * 4. Structural directives (*ngIf, *ngFor)
 */
@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  // Using $ suffix convention for Observable
  // This pattern enables reactive programming
  recipes$ = this.recipeService.getAllRecipes();

  // State management for UI
  selectedCuisine = 'All';
  cuisineList = ['All', 'Chinese', 'Thai', 'Japanese', 'Vietnamese', 'Korean', 'Indian'];
  readonly fallbackImage = 'assets/recipe-placeholder.svg';

  /**
   * Constructor with Dependency Injection
   * Angular provides RecipeService instance automatically
   * This pattern makes testing easier (can inject mock service)
   */
  constructor(private recipeService: RecipeService) {}

  /**
   * OnInit Lifecycle Hook
   * Called after component is initialized
   * Best place to load initial data from service
   */
  ngOnInit(): void {
    // Service already loads data in its constructor
    // We can trigger refresh if needed
    console.log('RecipesListComponent initialized');
  }

  /**
   * Filter recipes by cuisine
   * Event binding in template calls this method
   */
  filterByCuisine(cuisine: string): void {
    this.selectedCuisine = cuisine;
  }

  getFilteredRecipes(recipes: Recipe[]): Recipe[] {
    if (this.selectedCuisine === 'All') {
      return recipes;
    }

    const selectedCuisine = this.selectedCuisine.toLowerCase();
    return recipes.filter((recipe) => recipe.cuisine.toLowerCase() === selectedCuisine);
  }

  /**
   * Delete a recipe
   * Calls service, then refreshes the list
   */
  deleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe(
        () => {
          this.recipeService.refresh();
        },
        (error: any) => {
          console.error('Error deleting recipe:', error);
        }
      );
    }
  }

  /**
   * Track by function for *ngFor
   * Improves performance by helping Angular identify which items changed
   * Without this, Angular re-renders entire list on any change
   */
  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target.src.includes(this.fallbackImage)) {
      return;
    }
    target.src = this.fallbackImage;
  }
}
