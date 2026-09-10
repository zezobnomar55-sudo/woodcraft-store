import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/shared/header/header';
import { Footer } from './layout/shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header></app-header>
    <main class="min-vh-100 py-4">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `
})
export class App {}
