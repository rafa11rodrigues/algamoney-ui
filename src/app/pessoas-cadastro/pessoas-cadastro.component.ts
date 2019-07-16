import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent {

  enderecos = [0];

  adicionarEndereco() {
    this.enderecos.push(0);
  }

  removerEndereco(i: number) {
    this.enderecos.splice(i, 1);
  }
}
