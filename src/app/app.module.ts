import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputMaskModule, InputMask } from 'primeng/inputmask'
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { SelectButtonModule } from 'primeng/selectbutton'
import { DropdownModule } from 'primeng/dropdown'
import { DataTableModule } from 'primeng/datatable'
import { TooltipModule } from 'primeng/tooltip';

import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component'
import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { MessageComponent } from './shared/message/message.component';
import { LancamentosGridComponent } from './lancamentos/lancamentos-grid/lancamentos-grid.component';
import { PessoasGridComponent } from './pessoas/pessoas-grid/pessoas-grid.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    
    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
