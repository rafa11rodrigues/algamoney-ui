import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8080/categorias";
  private auth = "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==";

  listar(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.auth);

    return this.http.get(this.url, {headers})
    .toPromise();
  }
}
