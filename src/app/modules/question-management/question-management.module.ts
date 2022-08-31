import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionManagementComponent } from './components/question-management/question-management.component';
import { QuestionManagementRoutingModule } from './question-management-routing.module';

@NgModule({
  declarations: [
    QuestionManagementComponent
  ],
  imports: [
    CommonModule,
    QuestionManagementRoutingModule
  ]
})
export class QuestionManagementModule { }
