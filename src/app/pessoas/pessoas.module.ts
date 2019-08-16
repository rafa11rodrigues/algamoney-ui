import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { DataTableModule } from 'primeng/datatable';
import { TooltipModule } from 'primeng/tooltip';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { SharedModule } from '../shared/shared.module';
import { PessoaService } from './pessoa.service';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    InputMaskModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,

    SharedModule,
    PessoasRoutingModule
  ],
  exports: [],
  providers: [PessoaService]
})
export class PessoasModule { }
