import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  ptbr: any;
  tiposLancamento = [
    {'label': 'Receita', 'value':'RECEITA'},
    {'label': 'Despesa', 'value':'DESPESA'}
  ];
  categorias = [
    {'label': 'Alimentação', 'value':'Alimentação'},
    {'label': 'Transporte', 'value':'Transporte'},
    {'label': 'Lazer', 'value':'Lazer'}
  ];
  pessoas = [
    {'label': 'João da Silva', 'value':'João da Silva'},
    {'label': 'Maria das Dores', 'value':'Maria das Dores'},
    {'label': 'Gato de Botas', 'value':'Gato de Botas'}
  ];

  moeda = {
    align: "right",
    allowNegative: false,
    thousands: ".",
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: ""
  };

  constructor() { }

  ngOnInit() {
    this.ptbr = {
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
  }

}
