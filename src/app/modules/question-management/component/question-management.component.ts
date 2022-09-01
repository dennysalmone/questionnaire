import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IQuestionEntity } from '../../../shared/interfaces/interfaces';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent {

  itemList$: Observable<IQuestionEntity[]> = this.storeService.getQuestionsList();

  constructor(private storeService: StoreService) { }
}
