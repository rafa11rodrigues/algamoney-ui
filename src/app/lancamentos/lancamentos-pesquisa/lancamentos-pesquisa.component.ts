import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { LancamentoService } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

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
  
  constructor(private service: LancamentoService) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.service.pesquisar(this.filtro)
    .then(response => {
      this.lancamentos = response.content;
      this.total = response.totalElements;
    })
    .catch(erro => {
      console.log(erro);
    });
  }

  excluir(lancamento: any) {
    this.service.excluir(lancamento.id)
    .then(() => {
      if(this.lancamentos.length == 1 &&
         this.filtro.pagina > 0) {
        this.grid.grid.first = (this.filtro.pagina - 1) * this.filtro.tamanho;
      }
      else this.pesquisar(this.filtro.pagina);
    })
    .catch(erro => {
      console.log(erro);
    })
  }

  trocarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    if (pagina != this.filtro.pagina) this.pesquisar(pagina);
  }

  ngOnInit() {
    this.pesquisar();
  }
}
