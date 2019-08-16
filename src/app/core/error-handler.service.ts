import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private msgService: MessageService) {}

  handle(error: any) {
    let msg: string;

    if(typeof error == "string") {
      msg = error;
    }
    else if (error.error) {
      try {
        if (error.error.error && typeof error.error.error === "string") {
          if(error.error.error === "invalid_grant") msg = "Usuário ou senha inválidos";
        }
        else msg = error.error[0].mensagemUsuario || error.error.message || "Não foi possível completar a operação";
      }
      catch(e) {
        msg = "Um erro inesperado ocorreu";
      }
      
    }
    else {
      msg = "Não foi possível completar a operação";
    }
    console.log('Erro:\n', error);

    this.msgService.add({
      severity: "error",
      detail: msg,
      life: 7 * 1000 // 7s
    });
  }
}
