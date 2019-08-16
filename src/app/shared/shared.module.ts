import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MessageComponent } from './message/message.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    MessageComponent,
    RouterModule
  ],
})
export class SharedModule { }
