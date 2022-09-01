import { Component } from '@angular/core';

import { EQuestionAction } from '../enums/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  navList = [
    { link: '/question-list', name: 'List'},
    { link: '/question-management', name: 'Management'},
    { link: '/question-action', name: 'Add New', queryParams: { type: EQuestionAction.create } }
  ];
}
