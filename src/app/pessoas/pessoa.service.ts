import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

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

  listarPessoas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);

    return this.http.get(this.url, {headers})
    .toPromise();
  }
}

export interface PessoaFiltro {
  nome: string;
  pagina: number;
  tamanho: number;
}