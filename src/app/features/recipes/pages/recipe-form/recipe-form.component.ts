import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../../../services/recipe.service';

/**
 * RECIPE FORM COMPONENT - Create or edit recipes
 * Angular Characteristics:
 * 1. Reactive Forms (FormBuilder, FormGroup, FormArray)
 * 2. Form validation
 * 3. Dynamic form fields (ingredients array)
 * 4. Form state management
 */
@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  // Form group - contains all form controls
  recipeForm: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;

  cuisines = ['Chinese', 'Thai', 'Japanese', 'Vietnamese', 'Korean', 'Indian'];
  difficulties = ['easy', 'medium', 'hard'];

  /**
   * Dependency Injection
   * FormBuilder: Angular service for creating forms
   * RecipeService: For API calls
   * Router: For navigation after submission
   */
  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    // Initialize form with default values and validators
    this.recipeForm = this.createForm();
  }

  ngOnInit(): void {
    console.log('RecipeFormComponent initialized');
  }

  /**
   * Create form structure
   * Reactive Forms provide better control and testability
   * Angular Characteristic: Form Validation
   */
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      cuisine: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      difficulty: ['easy', Validators.required],
      prepTime: ['', [Validators.required, Validators.min(0)]],
      cookTime: ['', [Validators.required, Validators.min(0)]],
      servings: ['', [Validators.required, Validators.min(1)]],
      imageUrl: [''],
      instructions: ['', [Validators.required, Validators.minLength(20)]],
      // FormArray for dynamic ingredients
      ingredients: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ])
    });
  }

  /**
   * Getter for ingredients FormArray
   * Used in template to access ingredients
   */
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  /**
   * Add new ingredient field
   * Demonstrates dynamic form manipulation
   */
  addIngredient(): void {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  /**
   * Remove ingredient field
   * index: position of ingredient to remove
   */
  removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  /**
   * Submit form
   * Creates new recipe via service
   */
  onSubmit(): void {
    // Check if form is valid before submission
    if (this.recipeForm.invalid) {
      this.submitError = 'Please fill in all required fields correctly.';
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    // Get form data and filter out empty ingredients
    const formData = {
      ...this.recipeForm.value,
      ingredients: this.recipeForm.value.ingredients.filter((ing: string) => ing.trim())
    };

    this.recipeService.createRecipe(formData).subscribe(
      (recipe: any) => {
        this.isSubmitting = false;
        // Navigate to new recipe
        this.router.navigate(['/recipes', recipe.id]);
      },
      (error: any) => {
        this.isSubmitting = false;
        this.submitError = 'Error creating recipe. Please try again.';
        console.error('Error creating recipe:', error);
      }
    );
  }

  /**
   * Check if field has error
   * Used in template to show error messages
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.recipeForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }
}
