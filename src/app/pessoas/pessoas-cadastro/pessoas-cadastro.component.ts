import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent {

  constructor(private fb: FormBuilder) {}

  cadastro = this.fb.group({
    'nome': ['', [Validators.required, Validators.minLength(5)]],
    'enderecos': this.fb.array([this.novoEndereco()])
  });

  novoEndereco(): FormGroup {
    return this.fb.group({
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

  onSubmit() {
    console.log(this.cadastro.value);
  }
}
