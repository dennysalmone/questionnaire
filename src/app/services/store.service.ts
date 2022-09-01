import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { getQuestionById, getQuestionsList, getQuestionState, IState } from '../reducers';
import { IQuestionEntity } from '../shared/interfaces/interfaces';
import {
  AddQuestionAction, ChangeAnswersAction,
  DeleteQuestionAction,
  SetInitialDataAction,
  UpdateQuestionAction
} from '../reducers/questions/questions.actions';
import { IQuestionState } from '../reducers/questions/questions.reducer';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store<IState>) {
  }

  updateQuestion(questionData: IQuestionEntity): void {
    this.store.dispatch(UpdateQuestionAction({ questionData }));
  }

  deleteQuestion(id: string): void {
    this.store.dispatch(DeleteQuestionAction({ id }));
  }

  setInitialData(): void {
    const payload: IQuestionState = JSON.parse(localStorage.getItem('question_state') || '{}');
    if(!Object.keys(payload).length) return;
    this.store.dispatch(SetInitialDataAction({data: payload}));
  }

  getQuestionsList(): Observable<IQuestionEntity[]> {
    return this.store.select(getQuestionsList);
  }

  getQuestionById(id: string): Observable<IQuestionEntity> {
    return this.store.select(getQuestionById, { id });
  }

  addQuestion(questionData: IQuestionEntity): void {
    this.store.dispatch(AddQuestionAction({ questionData }));
  }

  changeAnswers(id: string, answer: string[]): void {
    this.store.dispatch(ChangeAnswersAction({id, answer}));
  }

  getCurrentState(): Observable<IQuestionState> {
    return this.store.pipe(select(getQuestionState));
  }
}
