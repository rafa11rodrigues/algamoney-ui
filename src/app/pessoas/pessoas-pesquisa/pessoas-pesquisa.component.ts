import { Component, OnInit } from '@angular/core';
import { PessoaService } from './../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  constructor(private service: PessoaService) {}

  pessoas = [];
  filtro = {
    nome: null,
    pagina: 0,
    tamanho: 5
  };
  total: number;

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.service.pesquisar(this.filtro)
    .then(response => {
      this.pessoas = response.content;
      this.total = response.totalElements;
    })
    .catch(erro => {
      console.log(erro);
    })
  }

  trocarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
