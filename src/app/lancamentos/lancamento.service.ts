import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams } from 'url';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8080/lancamentos";
  private auth = "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==";

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);
    let params = new HttpParams();
    
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
    if (filtro.vencimentoDe) {
      params = params.set('vencimentoDe', moment(filtro.vencimentoDe).format('YYYY-MM-DD'));
    }
    if (filtro.vencimentoAte) {
      params = params.set('vencimentoAte', moment(filtro.vencimentoAte).format('YYYY-MM-DD'));
    }
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.tamanho.toString());

    return this.http.get(`${this.url}?resumo`, {headers, params})
    .toPromise();
  }

  excluir(id: number): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);

    return this.http.delete(`${this.url}/${id}`, {headers})
    .toPromise();
  }
}

export interface LancamentoFiltro {
  descricao: string;
  vencimentoDe: Date;
  vencimentoAte: Date;
  pagina: number;
  tamanho: number;
}
