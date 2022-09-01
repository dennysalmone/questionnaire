import { IQuestionState } from './questions.reducer';
import { IQuestionEntity } from '../../shared/interfaces/interfaces';

export const selectQuestionById = (state: IQuestionState, props: { id: string }): IQuestionEntity => state[props.id];
export const selectQuestionsList = (state: IQuestionState): IQuestionEntity[] => Object.values(state);
export const selectQuestionState = (state: IQuestionState): IQuestionState => state;
