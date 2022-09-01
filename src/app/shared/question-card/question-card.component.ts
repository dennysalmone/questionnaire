import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IQuestionEntity } from '../interfaces/interfaces';
import { EQuestionAction, EQuestionType } from '../enums/enums';
import { StoreService } from 'src/app/services/store.service';
import { ModalComponent } from '../modal/modal.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() itemData: IQuestionEntity;
  @Input() isManagement: boolean = false;
  @Input() isAnswered: boolean = false;

  EQuestionType = EQuestionType;
  answerForm: FormGroup;
  isActive: boolean = true;
  singleOption: string;
  multipleOptions: { name: string, isChecked: boolean }[];

  constructor( private storeService: StoreService, private router: Router, private dialog: MatDialog, private fb: FormBuilder, private snackbar: SnackbarService ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.answerForm = this.fb.group({
      open: [''],
    });
    this.multipleOptions = this.itemData.data?.options?.map(option =>
      ({name: option, isChecked: false})
    );
  }

  openModal(id: string): void {
    this.dialog.open(ModalComponent, {width: '400px', data: {id}});
  }

  editQuestion(id: string): void {
    this.router.navigate([`/question-action`], {queryParams: {type: EQuestionAction.update, id}});
  }

  getAnswerList(): string[] {
    let answerList: string[] = [];
    if (this.itemData.type === EQuestionType.open) {
      answerList.push(this.answerForm.get('open')?.value);
    }
    if (this.itemData.type === EQuestionType.multiple) {
      answerList = this.multipleOptions?.filter(option => option.isChecked).map(item => item.name) as string[];
    }
    if (this.itemData.type === EQuestionType.single) {
      answerList.push(this.singleOption);
    }
    return answerList;
  }

  addAnswer(id: string): void {
    this.isActive = true;
    const answer = this.getAnswerList();
    if(!answer.join('').length) {
      this.snackbar.openSnackBarError("Not valid answer", "Ok")
      return;
    }
    this.storeService.changeAnswers(id, answer);
  }

  deleteAnswer(id: string): void {
    this.storeService.changeAnswers(id, []);
  }

  selectOption(idx: number): void {
    if (!this.multipleOptions?.length) return;
    this.multipleOptions[idx].isChecked = !this.multipleOptions[idx].isChecked;
  }
}

