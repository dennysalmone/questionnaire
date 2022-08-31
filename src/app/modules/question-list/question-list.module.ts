import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionListRoutingModule } from './question-list-routing.module';

@NgModule({
  declarations: [
    QuestionListComponent
  ],
  imports: [
    CommonModule,
    QuestionListRoutingModule
  ]
})
export class QuestionListModule { }
