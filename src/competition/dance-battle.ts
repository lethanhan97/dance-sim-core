import { Dancer } from '../participants/dancer';
import { Judge } from '../participants/judge';

type DanceBattleResult<T extends Dancer> =
  | {
      isTie: true;
      winner: null;
      loser: null;
    }
  | {
      isTie: false;
      winner: T;
      loser: T;
    };

export class DanceBattle {
  static TIME_ELAPSED_PER_BATTLE_IN_MINUTES = 2.5;

  static battle<T extends Dancer>({
    dancers,
    judge,
  }: {
    dancers: [T, T];
    judge: Judge;
  }): DanceBattleResult<T> {
    // TODO: Get each dancer's round stats and pass in to judge
    const firstDancerRoundStat = dancers[0].dance();
    const secondDancerRoundStat = dancers[1].dance();

    const firstDancerRoundResult = judge.judge(firstDancerRoundStat);
    const secondDancerRoundResult = judge.judge(secondDancerRoundStat);

    if (firstDancerRoundResult === secondDancerRoundResult) {
      return {
        isTie: true,
        winner: null,
        loser: null,
      };
    }

    return {
      isTie: false,
      winner:
        firstDancerRoundResult > secondDancerRoundResult
          ? dancers[0]
          : dancers[1],
      loser:
        firstDancerRoundResult > secondDancerRoundResult
          ? dancers[1]
          : dancers[0],
    };
  }
}
