import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    
    SharedModule,
    SegurancaRoutingModule,

    InputTextModule,
    ButtonModule
  ]
})
export class SegurancaModule { }
