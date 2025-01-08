import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';  // <-- Importação do FormsModule
import { HttpClientModule } from '@angular/common/http'; // Para chamadas HTTP
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule
  ],
  declarations: [

      // <-- Declare o TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  // <-- Adicione FormsModule aqui
    HttpClientModule ,
    RouterOutlet // <-- Import necessário para chamadas HTTP
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
