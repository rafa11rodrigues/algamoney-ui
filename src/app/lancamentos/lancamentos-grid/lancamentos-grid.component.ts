import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

    @Input() lancamentos: any[];
    @Input() linhas: number;
    @Input() total: number;
    @Output() paginaTrocada = new EventEmitter();
    @Output() aoExcluir = new EventEmitter();
    @ViewChild('grid') grid: any;

    lancamentoVencido(dataVencimento: string): boolean {
      return new Date(dataVencimento).getTime() < (new Date()).getTime();
    }

    trocarPagina(event: LazyLoadEvent) {
      this.paginaTrocada.emit(event)
    }

    excluir(lancamento: any) {
      this.aoExcluir.emit(lancamento);
    }
}
