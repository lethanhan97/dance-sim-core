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
    const firstDancerRoundStat = dancers[0].dance();
    const secondDancerRoundStat = dancers[1].dance();

    console.log(
      `${dancers[0].name} round stat: ${JSON.stringify(
        firstDancerRoundStat,
        null,
        2
      )}`
    );

    console.log(
      `${dancers[1].name} round stat: ${JSON.stringify(
        secondDancerRoundStat,
        null,
        2
      )}`
    );

    return judge.judge(...dancers);
  }
}
