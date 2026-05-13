import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * ABOUT COMPONENT - Simple informational component
 * Demonstrates: Simple standalone component with no services
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {}
