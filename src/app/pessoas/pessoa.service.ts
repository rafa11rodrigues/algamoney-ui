import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Pessoa } from './pessoa';
import { Endereco } from './endereco';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8080/pessoas";
  private auth = "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==";

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);

    let params = new HttpParams();
    if (filtro.nome) {
      params = params.set('nome', filtro.nome)
    }
    params = params.set('page', filtro.pagina.toString())
    params = params.set('size', filtro.tamanho.toString())

    return this.http.get(this.url, {headers, params})
    .toPromise();
  }

  listar(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);

    return this.http.get(this.url, {headers})
    .toPromise();
  }

  buscar(id: number): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);

    return this.http.get(`${this.url}/${id}`, {headers})
    .toPromise();
  }

  excluir(id: number): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);

    return this.http.delete(`${this.url}/${id}`, {headers})
    .toPromise();
  }

  alternarStatus(id: number, status: any): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.url}/${id}/ativo`, status, {headers})
    .toPromise();
  }

  salvar(pessoa: Pessoa, novo = false): Promise<any> {
    let headers = new HttpHeaders().append('Authorization', this.auth);
    headers = headers.append('Content-Type', 'application/json');

    if(novo) {
      return this.http.post(this.url, pessoa, {headers})
      .toPromise();
    }
    
    return this.http.put(`${this.url}/${pessoa.id}`, pessoa, {headers})
    .toPromise();
  }

  criarPessoa(values: any): Pessoa {
    let pessoa = new Pessoa();
    pessoa.id = values.id;
    pessoa.nome = values.nome;
    pessoa.enderecos = values.enderecos.map(e => {
      let endereco = new Endereco();
      endereco.id = e.id;
      endereco.logradouro = e.logradouro;
      endereco.numero = e.numero;
      endereco.complemento = e.complemento;
      endereco.bairro = e.bairro;
      endereco.cep = e.cep;
      endereco.cidade = e.cidade;
      endereco.estado = e.estado;
      return endereco;
    });
    return pessoa;
  }
}

export interface PessoaFiltro {
  nome: string;
  pagina: number;
  tamanho: number;
}