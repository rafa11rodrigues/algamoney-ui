import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../pessoa';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private service: PessoaService,
              private msgService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) {}

  cadastro = this.fb.group({
    'id': [],
    'nome': ['', [Validators.required, Validators.minLength(5)]],
    'enderecos': this.fb.array([this.novoEndereco()])
  });

  novoEndereco(): FormGroup {
    return this.fb.group({
      id: [],
      logradouro: ['', Validators.required],
      numero: [0, Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  adicionarEndereco() {
    this.enderecos.push(this.novoEndereco());
  }

  removerEndereco(i: number) {
    this.enderecos.removeAt(i);
  }

  get enderecos(): FormArray {
    return this.cadastro.get('enderecos') as FormArray;
  }



  salvando = false;
  editando = false;

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if(id) {
      this.title.setTitle("Editar Pessoa | Algamoney");
      this.editando = true;
      this.buscar(id);
    }
    else {
      this.title.setTitle("Nova Pessoa | Algamoney");
    }
  }

  buscar(id: number) {
    this.service.buscar(id)
    .then((p: Pessoa) => {
      this.cadastro.patchValue({id: p.id, nome: p.nome});
      this.removerEndereco(0);

      p.enderecos.forEach(e => {
        let end = this.novoEndereco();
        end.patchValue(e);
        this.enderecos.push(end);
      })
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    })
  }

  salvar() {
    this.salvando = true;
    
    let pessoa = this.service.criarPessoa(this.cadastro.value);
    this.service.salvar(pessoa, !this.editando)
    .then(p => {
      this.salvando = false;
      this.msgService.add({
        severity: "success",
        detail: "Pessoa salva com sucesso",
        life: 7 * 1000
      });

      if(!this.editando) {
        this.router.navigate(['/pessoas', p.id]);
      }
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
      this.salvando = false;
    })
  }

  novo() {
    if(this.editando) {
      this.router.navigate(["/pessoas/cadastro"]);
    }

    this.cadastro.reset();
    while(this.enderecos.length > 1) {
      this.enderecos.removeAt(0);
    }
  }
}
