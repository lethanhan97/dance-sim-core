import { Dancer } from '../participants/dancer';

export class DanceBattle {
  static TIME_ELAPSED_PER_BATTLE = 2;

  // returns [winner, loser]
  static battle(dancer1: Dancer, dancer2: Dancer) {
    const randomNumber = Math.random();

    const winner = randomNumber > 0.5 ? dancer1 : dancer2;
    const loser = randomNumber <= 0.5 ? dancer1 : dancer2;

    return [winner, loser];
  }
}
