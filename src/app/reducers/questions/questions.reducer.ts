import { createReducer, on } from '@ngrx/store';
import { IQuestionEntity } from '../../shared/interfaces/interfaces';
import { EQuestionsActionsType } from './questions.enums';
import { AddQuestionAction, ChangeAnswersAction, DeleteQuestionAction, SetInitialDataAction, UpdateQuestionAction } from 'src/app/reducers/questions/questions.actions';

export const questionsFeatureKey = 'questions';

export interface IQuestionState {
  [key: string]: IQuestionEntity
}

export const initialState: IQuestionState = {};

export const questionReducer = createReducer(
  initialState,
  on(AddQuestionAction, (state, { questionData }) => {
    return {
      ...state,
      [questionData.id]: questionData
    };
  }),
  on(UpdateQuestionAction, (state, { questionData }) => {
    const id = questionData.id;
    return {
      ...state,
      [id]: {...state[id], ...questionData, data: {...state[id].data,...questionData.data}}
    };
  }),
  on(ChangeAnswersAction, (state, { id, answer }) => {
      return {
        ...state,
        [id]: {...state[id], data: {...state[id].data, answer: [...answer]}}
      };
  }),
  on(DeleteQuestionAction, (state, { id }) => {
      const newState = {...state};
      delete newState[id];
      return newState;
  }),
  on(SetInitialDataAction, (state, {data}) => {
       return data;
  }),
);
