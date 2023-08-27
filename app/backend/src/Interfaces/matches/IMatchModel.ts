import { ICRUDModelReader, ICRUDModelUpdater } from '../ICRUDModel';
import IMatch from './IMatch';

export interface IMatchModel extends ICRUDModelReader<IMatch>, ICRUDModelUpdater<IMatch>{
  // findAll(): Promise<IMatch[]>,
  // findById(id: IMatch['id']): Promise<IMatch | null>,
  findByProgress(inProgress: boolean): Promise<IMatch[]>,
  finishMatch(id: IMatch['id']): Promise<void>,
}
