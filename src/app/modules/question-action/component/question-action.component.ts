import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { StoreService } from '../../../services/store.service';
import { EQuestionAction, EQuestionType } from '../../../shared/enums/enums';
import { IQuestionData, IQuestionEntity } from '../../../shared/interfaces/interfaces';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-question-action',
  templateUrl: './question-action.component.html',
  styleUrls: ['./question-action.component.scss']
})

export class QuestionActionComponent implements OnInit, OnDestroy {
  EQuestionActionType = EQuestionAction;
  EQuestionType = EQuestionType;
  typeOptions = [
    { label: EQuestionType.single, value: 'Single' },
    { label: EQuestionType.multiple, value: 'Multiple' },
    { label: EQuestionType.open, value: 'Open' }
  ];

  destroy$: Subject<void> = new Subject<void>();
  options: string[] = [];
  action: string = EQuestionAction.create;
  questionType: string = EQuestionType.single;
  selectedId: string;
  selectedTypeId: number = 0;

  questionForm: FormGroup = this.fb.group({
    type: [''],
    question: ['', [Validators.required]],
    option: ['']
  });

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscribeForm();
    this.checkQueryParams();
    this.getQuestionData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribeForm(): void {
    this.questionForm.get('type')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (type) => {
          this.questionType = type?.toLowerCase();
          if(this.questionType !== EQuestionType.open) return;
          this.options = [];
        }
      });
  }

  checkQueryParams(): void {
    if (this.activatedRoute.snapshot.queryParams.hasOwnProperty('id')) {
      this.selectedId = this.activatedRoute.snapshot.queryParams['id'];
    }
    if (this.activatedRoute.snapshot.queryParams.hasOwnProperty('type')) {
      this.action = this.activatedRoute.snapshot.queryParams['type'];
    }
  }

  getQuestionData(): void {
    if(!this.selectedId) return;
    this.storeService.getQuestionById(this.selectedId)
      .subscribe({
        next: (questionItem) => {
          this.questionForm.setValue({
            type: questionItem.type,
            question: questionItem.data.question,
            option: ''
          });
          this.selectedTypeId = this.typeOptions
            .findIndex(option => option.value.toLowerCase() === questionItem.type);
          if(questionItem.type === EQuestionType.open || !questionItem.data.options?.length) return;
          this.options = [...questionItem.data.options];
        }
      });
  }

  addOption(): void {
    const optionValue = this.questionForm.value.option;
    if (!optionValue || !optionValue.trim().length) {
      this.snackbar.openSnackBarError('Option value is empty!', 'Ok');
      return;
    }
    this.options.push(optionValue.trim());
    this.questionForm.get('option')?.setValue('');
  }

  deleteOption(index: number): void {
    this.options.splice(index, 1);
  }

  getData(isNew: boolean = true): IQuestionEntity {
    const questionId = isNew ? Math.random().toString(16).slice(2) : this.selectedId;
    const questionData: IQuestionEntity = {
      id: questionId,
      updateAt: new Date(),
      type: this.questionType,
      data: {
        question: this.questionForm.value.question,
        options: this.options,
        answer: []
      }
    };
    if(isNew) {
      questionData.createAt = new Date();
    }
    return questionData;
  }

  addQuestion(): void {
    if(this.questionType !== EQuestionType.open.toLowerCase() && this.options.length < 2) {
      this.snackbar.openSnackBarError('It`s shall be 2 or more values', 'Ok');
      return;
    }
    const questionData = this.getData();
    this.storeService.addQuestion(questionData);
    this.router.navigate(['/question-management']);
    this.snackbar.openSnackBarSucces('New question was created', 'Ok');
  }

  editQuestion(): void {
    if(this.questionType !== EQuestionType.open.toLowerCase() && this.options.length < 2) {
      this.snackbar.openSnackBarError('It`s shall be 2 or more options', 'Ok');
      return;
    }
    const updatedData: IQuestionEntity = this.getData(false);
    this.storeService.updateQuestion(updatedData);
    this.router.navigate(['/question-management']);
  }
}
