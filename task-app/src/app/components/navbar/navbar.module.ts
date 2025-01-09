import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import para ngClass
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router'; // Para suporte ao routerLink

@NgModule({
  declarations: [],
  imports: [
    CommonModule, // Import necessário para ngClass
    RouterModule, // Import para routerLink
  ],
  exports: [],
})
export class NavbarModule {}
