import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe, RecipeService } from '../../../../services/recipe.service';

/**
 * RECIPE DETAIL COMPONENT - Shows detailed view of a single recipe
 * Angular Characteristics:
 * 1. Route Parameters - accessing :id from URL
 * 2. OnInit lifecycle hook
 * 3. Observable handling with async pipe
 * 4. Error handling
 */
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  isLoading = true;
  error: string | null = null;

  /**
   * Dependency Injection:
   * - ActivatedRoute: Access current route and parameters
   * - RecipeService: Get recipe data
   */
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  /**
   * OnInit - Initialize component
   * Get recipe ID from URL params and fetch recipe data
   */
  ngOnInit(): void {
    // Angular Characteristic: Route parameter subscription
    // params is an Observable that emits when route changes
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        this.loadRecipe(id);
      }
    );
  }

  /**
   * Load recipe details from service
   * Handles loading and error states
   */
  private loadRecipe(id: number): void {
    this.isLoading = true;
    this.recipeService.getRecipeById(id).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
        this.isLoading = false;
      },
      (error: any) => {
        this.error = 'Failed to load recipe. Please try again.';
        this.isLoading = false;
        console.error('Error loading recipe:', error);
      }
    );
  }

  /**
   * Calculate total time
   * Used in template to show combined prep + cook time
   */
  getTotalTime(): number {
    return (this.recipe?.prepTime || 0) + (this.recipe?.cookTime || 0);
  }
}
