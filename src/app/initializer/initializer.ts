import { Store } from '@ngrx/store';
import { delay, first } from 'rxjs';
import { IState, getQuestionsList } from '../reducers';

export const initializeApp = function(store: Store<IState>): () => Promise<boolean> {
    return () => new Promise(async (resolve, reject) => {
    store.select(getQuestionsList)
        .pipe(
            delay(2000),
            first()
        )
        .subscribe({
            next: () => {
                resolve(true);
            }
        });
    });
}
  