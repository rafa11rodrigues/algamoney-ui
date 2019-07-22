import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TooltipModule } from 'primeng/tooltip';
import { DataTableModule } from 'primeng/datatable';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentoService } from './lancamento.service';

@NgModule({
  declarations: [
    LancamentosCadastroComponent,
    LancamentosPesquisaComponent,
    LancamentosGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    DataTableModule,
    TooltipModule,
    CurrencyMaskModule,

    SharedModule
  ],
  exports: [
    LancamentosCadastroComponent,
    LancamentosPesquisaComponent
  ],
  providers: [LancamentoService]
})
export class LancamentosModule { }
