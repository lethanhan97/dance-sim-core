import { DanceRoundStats } from './dancer';

type IndividualRoundResult = number;
export class Judge {
  name: string;
  judgingPreference: Record<string, number>;

  static BASE_MULTIPLIER = 0;

  constructor(name: string) {
    this.name = name;

    // TODO: Get this from constructor instead
    this.judgingPreference = {
      musicality: 0.6,
      foundation: 0.4,
    };
  }

  judge(danceRound: DanceRoundStats): IndividualRoundResult {
    return Object.keys(danceRound).reduce((result, key) => {
      const judgeMultiplier =
        this.judgingPreference[key] || Judge.BASE_MULTIPLIER;

      return result + judgeMultiplier * danceRound[key];
    }, 0);
  }
}
