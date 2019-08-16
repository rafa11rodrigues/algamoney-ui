import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas: any[];
  @Input() linhas: number;
  @Input() total: number;
  @Output() paginaTrocada = new EventEmitter();
  @Output() aoExcluir = new EventEmitter();
  @Output() aoAlternarStatus = new EventEmitter();
  @ViewChild('grid') grid: any;

  
  trocarPagina(event: LazyLoadEvent) {
    this.paginaTrocada.emit(event);
  }

  excluir(pessoa: any) {
    this.aoExcluir.emit(pessoa);
  }

  alternarStatus(pessoa: any) {
    this.aoAlternarStatus.emit(pessoa);
  }
}
