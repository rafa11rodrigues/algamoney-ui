import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  
  dispararEvento(event: LazyLoadEvent) {
    this.paginaTrocada.emit(event);
  }
}
