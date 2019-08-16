import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NaoEncontradaComponent } from './nao-encontrada.component';
import { Title } from '@angular/platform-browser';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    NaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    ButtonModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    ErrorHandlerService,
    Title
  ]
})
export class CoreModule { }
