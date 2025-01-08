import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';  // <-- Importação do FormsModule
import { HttpClientModule } from '@angular/common/http'; // Para chamadas HTTP
import { RouterOutlet } from '@angular/router';

@NgModule({
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
