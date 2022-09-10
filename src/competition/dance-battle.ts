import { Dancer } from '../participants/dancer';

export class DanceBattle {
  static TIME_ELAPSED_PER_BATTLE_IN_MINUTES = 2;

  static battle<T extends Dancer>(dancer1: T, dancer2: T) {
    const randomNumber = Math.random();

    const winner = randomNumber > 0.5 ? dancer1 : dancer2;
    const loser = randomNumber <= 0.5 ? dancer1 : dancer2;

    return [winner, loser];
  }
}
