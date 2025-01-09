import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Certifique-se de importar o Router

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrigido: 'styleUrl' -> 'styleUrls'
})
export class NavbarComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    // Observar a rota ativa
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }


  goToAddTask(): void {
    this.router.navigate(['/task']);
  }
  goToHome(): void {
    this.router.navigate(['/home']);
  }
  goTaskPendente(): void {
    this.router.navigate(['/pending']);
  }
  goTaskConcluido(): void {
    this.router.navigate(['/sucess']);
  }
}
