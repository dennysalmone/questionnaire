import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'question-list'
  },
  {
    path: 'question-add',
    loadChildren: () => import('src/app/modules/question-add-edit/question-add-edit.module').then(m => m.QuestionAddEditModule)
  },
  {
    path: 'question-list',
    loadChildren: () => import('src/app/modules/question-list/question-list.module').then(m => m.QuestionListModule)
  },
  {
    path: 'question-management',
    loadChildren: () => import('src/app/modules/question-management/question-management.module').then(m => m.QuestionManagementModule)
  },
  {
    path: '**',
    redirectTo: 'question-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
