import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionAddEditComponent } from './components/question-add-edit/question-add-edit.component';
import { QuestionAddEditRoutingModule } from './question-add-edit-routing.module';

@NgModule({
  declarations: [
    QuestionAddEditComponent
  ],
  imports: [
    CommonModule,
    QuestionAddEditRoutingModule
  ]
})
export class QuestionAddEditModule { }
