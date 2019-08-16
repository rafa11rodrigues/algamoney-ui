import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { LancamentoService } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];

  ptbr = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta--feira", "Sexta--feira", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["Do","Sg","Te","Qa","Qi","Sx","Sa"],
    monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sem'
  };

  filtro = {
      descricao: null,
      vencimentoDe: null,
      vencimentoAte: null,
      pagina: 0,
      tamanho: 5
  };
  total: number;
  @ViewChild('grid') grid: any;
  
  constructor(private service: LancamentoService,
              private msgService: MessageService,
              private cdService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.service.pesquisar(this.filtro)
    .then(response => {
      this.lancamentos = response.content;
      this.total = response.totalElements;
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

  confirmarExclusao(lancamento: any) {
    this.cdService.confirm({
      header: "Excluir lançamento",
      message: "Tem certeza de que deseja excluir o lançamento selecionado?",
      accept: () => {
        this.excluir(lancamento);
      },
      acceptLabel: "SIM",
      rejectLabel: "NÃO"
    })
  }

  excluir(lancamento: any) {
    this.service.excluir(lancamento.id)
    .then(() => {
      if(this.lancamentos.length == 1 &&
         this.filtro.pagina > 0) {
        this.grid.grid.first = (this.filtro.pagina - 1) * this.filtro.tamanho;
      }
      else this.pesquisar(this.filtro.pagina);

      this.msgService.add({
        severity: "success",
        detail: "Lançamento excluído com sucesso",
        life: 10 * 1000 // 10s
      });
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

  trocarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    if (pagina != this.filtro.pagina) this.pesquisar(pagina);
  }

  ngOnInit() {
    this.title.setTitle("Lançamentos | Algamoney")
    this.pesquisar();
  }
}
