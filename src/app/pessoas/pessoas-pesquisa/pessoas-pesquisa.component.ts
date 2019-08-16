import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService } from './../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  constructor(private service: PessoaService,
              private msgService: MessageService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title) {}

  pessoas = [];
  filtro = {
    nome: null,
    pagina: 0,
    tamanho: 5
  };
  total: number;
  @ViewChild('grid') grid: any;


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.service.pesquisar(this.filtro)
    .then(response => {
      this.pessoas = response.content;
      this.total = response.totalElements;
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    })
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      header: "Excluir pessoa",
      message: "Tem certeza de que deseja excluir a pessoa? Todos os lançamentos vinculados também serão excluídos.",
      accept: () => {this.excluir(pessoa)},
      acceptLabel: "SIM",
      rejectLabel: "NÃO"
    });
  }

  excluir(pessoa: any) {
    this.service.excluir(pessoa.id)
    .then(() => {
      if(this.pessoas.length == 1 &&
         this.filtro.pagina > 0) {
           this.grid.grid.first = (this.filtro.pagina - 1) * this.filtro.tamanho;
      }
      else this.pesquisar(this.filtro.pagina);

      this.msgService.add({
        severity: "success",
        detail: "Pessoa excluída com sucesso",
        life: 7 * 1000
      });
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

  alternarStatus(pessoa: any) {
    const novoStatus = {ativo: !pessoa.ativo};

    this.service.alternarStatus(pessoa.id, novoStatus)
    .then(() => {
      this.pesquisar(this.filtro.pagina);
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

  trocarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    if(pagina != this.filtro.pagina) this.pesquisar(pagina);
  }

  ngOnInit() {
    this.title.setTitle("Pessoas | Algamoney");
    this.pesquisar();
  }
}
