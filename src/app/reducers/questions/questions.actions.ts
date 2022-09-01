import { createAction, props } from '@ngrx/store';
import { IQuestionEntity } from '../../shared/interfaces/interfaces';
import { EQuestionsActionsType } from './questions.enums';
import { IQuestionState } from './questions.reducer';


export const AddQuestionAction = createAction(EQuestionsActionsType.addQuestionAction, props<{ questionData: IQuestionEntity }>()); 
export const UpdateQuestionAction = createAction(EQuestionsActionsType.updateQuestionAction, props<{ questionData: IQuestionEntity }>()); 
export const ChangeAnswersAction = createAction(EQuestionsActionsType.changeAnswersAction, props<{ id: string, answer: string[] }>()); 
export const DeleteQuestionAction = createAction(EQuestionsActionsType.deleteQuestionAction, props<{ id: string }>()); 
export const SetInitialDataAction = createAction(EQuestionsActionsType.setInitialData, props<{ data: IQuestionState }>()); 

