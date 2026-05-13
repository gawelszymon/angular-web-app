import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

/**
 * ROOT COMPONENT - The main container component
 * This is where routing will render different views
 * Angular Characteristic: Component-based architecture
 * Every view in the app is a component (reusable, encapsulated)
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Component logic and properties go here
  title = 'Asian Cuisine Recipes';
}
