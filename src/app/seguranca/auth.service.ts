import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private oauthUrl = "http://localhost:8080/oauth/token";
  private auth = "Basic YW5ndWxhcjo0bkdVMWFS";

  login(username, password): Promise<any> {
    let headers = new HttpHeaders().append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("Authorization", this.auth);
    
    const body = `client=angular&username=${username}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthUrl, body, {headers})
    .toPromise();
  }
}
