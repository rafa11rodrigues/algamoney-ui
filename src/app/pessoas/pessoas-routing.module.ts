import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';

const routes: Routes = [
  { path: "pessoas", component: PessoasPesquisaComponent},
  { path: "pessoas/cadastro", component: PessoasCadastroComponent},
  { path: "pessoas/:id", component: PessoasCadastroComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
