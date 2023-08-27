import IMatch from './IMatch';

export interface IMatchModel{
  findAll(): Promise<IMatch[]>,
  findByProgress(inProgress: boolean): Promise<IMatch[]>,
}
