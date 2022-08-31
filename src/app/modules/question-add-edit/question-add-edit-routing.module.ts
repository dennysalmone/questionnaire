import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionAddEditComponent } from './components/question-add-edit/question-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionAddEditRoutingModule {
}
