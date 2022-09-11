import { Dancer } from '../participants/dancer';
import { Judge } from '../participants/judge';

export class DanceBattle {
  static TIME_ELAPSED_PER_BATTLE_IN_MINUTES = 2.5;

  static battle<T extends Dancer>({
    dancers,
    judge,
  }: {
    dancers: [T, T];
    judge: Judge;
  }) {
    // TODO: Get each dancer's round stats and pass in to judge
    return judge.judge(...dancers);
  }
}
