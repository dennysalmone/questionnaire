import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { StoreService } from '../../../services/store.service';
import { IQuestionEntity } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  list$: Observable<IQuestionEntity[]> = this.storeService.getQuestionsList();
  destroy$: Subject<void> = new Subject<void>();

  questionList: IQuestionEntity[];
  answerList: IQuestionEntity[];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getQuestionsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getListSuccesHandler(questionItem: IQuestionEntity[]): void {
    const newDate = new Date();
    const sorted = questionItem.sort((a, b) =>
      new Date(b?.createAt || newDate).getTime() - new Date(a?.createAt || newDate).getTime()
    );
    this.questionList = sorted.filter(item => !item.data.answer.length);
    this.answerList = sorted.filter(item => item.data.answer.length);
  }

  getQuestionsList(): void{
    this.list$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (questionItems) => this.getListSuccesHandler(questionItems)
      })
  }
}
