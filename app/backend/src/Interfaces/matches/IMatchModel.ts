import { ICRUDModelCreator, ICRUDModelReader, ICRUDModelUpdater } from '../ICRUDModel';
import IMatch from './IMatch';

export interface IMatchModel extends ICRUDModelReader<IMatch>,
  ICRUDModelUpdater<IMatch>, ICRUDModelCreator<IMatch>{
  findByProgress(inProgress: boolean): Promise<IMatch[]>,
  finishMatch(id: IMatch['id']): Promise<void>,
}
