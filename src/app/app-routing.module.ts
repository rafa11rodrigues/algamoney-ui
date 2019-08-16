import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NaoEncontradaComponent } from './core/nao-encontrada.component';
import { LancamentosRoutingModule } from './lancamentos/lancamentos-routing.module';
import { PessoasRoutingModule } from './pessoas/pessoas-routing.module';
import { SegurancaRoutingModule } from './seguranca/seguranca-routing.module';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full"},
  { path: "**", component: NaoEncontradaComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LancamentosRoutingModule,
    PessoasRoutingModule,
    SegurancaRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
