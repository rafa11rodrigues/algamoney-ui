import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';

const routes: Routes = [
  { path: "lancamentos", component: LancamentosPesquisaComponent},
  { path: "lancamentos/cadastro", component: LancamentosCadastroComponent},
  { path: "lancamentos/:id", component: LancamentosCadastroComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
