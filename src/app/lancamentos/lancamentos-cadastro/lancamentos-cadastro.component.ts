import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Lancamento } from '../lancamento';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tiposLancamento = [
    {'label': 'Receita', 'value':'RECEITA'},
    {'label': 'Despesa', 'value':'DESPESA'}
  ];
  categorias = [];
  pessoas = [];

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
  moeda = {
    align: "right",
    allowNegative: false,
    thousands: ".",
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: ""
  };

  lancamento = new Lancamento();
  salvando = false;
  editando = false;

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private service: LancamentoService,
              private msgService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title.setTitle("Editar Lançamento | Algamoney")
      this.editando = true;
      this.buscar(id);
    }
    else {
      this.title.setTitle("Novo Lançamento | Algamoney")
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  buscar(id: number) {
    this.service.buscar(id)
    .then(lancamento => {
      this.lancamento.id = lancamento.id;
      this.lancamento.dataVencimento = this.service.stringParaDate(lancamento.dataVencimento);
      this.lancamento.dataPagamento = (lancamento.dataPagamento) ? this.service.stringParaDate(lancamento.dataPagamento) : null;
      this.lancamento.descricao = lancamento.descricao;
      this.lancamento.valor = lancamento.valor;
      this.lancamento.categoria = lancamento.categoria;
      this.lancamento.pessoa = lancamento.pessoa;
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

  carregarCategorias() {
    this.categoriaService.listar()
    .then(categorias => {
      this.categorias = categorias.map(c => ({label: c.nome, value: c.id}));
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

  carregarPessoas() {
    this.pessoaService.listar()
    .then(pessoas => {
      this.pessoas = pessoas.content.filter(p => p.ativo).map(p => ({label: p.nome, value: p.id}));
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

  salvar(form: FormControl) {
    this.salvando = true;
    
    this.service.salvar(this.lancamento, !this.editando)
    .then(l => {
      this.salvando = false;
      this.msgService.add({
        severity: "success",
        detail: "Lançamento salvo com sucesso",
        life: 7 * 1000
      });

      //form.reset();
      //this.lancamento = new Lancamento();

      if(!this.editando) this.router.navigate(['/lancamentos', l.id]);
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
      this.salvando = false;
    });
  }

  novo(form: FormControl) {
    if(this.editando) {
      this.router.navigate(['/lancamentos', 'cadastro']);
    }

    form.reset();
    setTimeout(() => {this.lancamento = new Lancamento()}, 1);
  }
}
