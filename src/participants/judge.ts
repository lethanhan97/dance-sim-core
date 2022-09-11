import { Dancer } from './dancer';

export class Judge {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  // TODO: Change to take in round stats instead
  // TODO: Add handling for tie
  judge<T extends Dancer>(
    dancer1: T,
    dancer2: T
  ):
    | {
        isTie: true;
        winner: null;
        loser: null;
      }
    | {
        isTie: false;
        winner: T;
        loser: T;
      } {
    // TODO: Update logic
    const randomNumber = Math.random();

    const isTie = randomNumber === 0.5;

    if (isTie) {
      return {
        isTie,
        winner: null,
        loser: null,
      };
    }
    const winner = randomNumber > 0.5 ? dancer1 : dancer2;
    const loser = randomNumber < 0.5 ? dancer1 : dancer2;

    return {
      isTie,
      winner,
      loser,
    };
  }
}
