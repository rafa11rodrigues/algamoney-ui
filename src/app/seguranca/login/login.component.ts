import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login = {
    username: "",
    senha: ""
  };

  constructor(private auth: AuthService,
              private errorHandler: ErrorHandlerService) { }

  onSubmit() {
    this.auth.login(this.login.username, this.login.senha)
    .then(resp => {
      console.log(resp);
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    })
  }
}
