import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MessageComponent
  ]
})
export class SharedModule { }
