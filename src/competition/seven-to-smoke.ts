import { Queue } from '../data-structures/queue';
import { Dancer } from '../participants/dancer';
import { DanceBattle } from './dance-battle';

class SevenToSmokeLogger {
  static logCurrentRoundInfo({
    round,
    defender,
    challenger,
    dancersQueue,
  }: {
    round: number;
    defender: SevenToSmokeParticipant;
    challenger: SevenToSmokeParticipant;
    dancersQueue: Queue<SevenToSmokeParticipant>;
  }) {
    console.log(`================== ROUND ${round} ==================`);
    console.log(
      `Commence battle: ${defender.toString()} vs ${challenger.toString()}`
    );

    console.log();
    console.log('Dancers in the queue:');
    console.log(dancersQueue.toString());
  }

  static logWinnerInfo({ winner }: { winner: SevenToSmokeParticipant }) {
    console.log();
    console.log(`Winner is: ${winner.toString()}`);
    console.log('=============================================');
    console.log();
  }

  static logSevenToSmokeInfo({ sevenToSmoke }: { sevenToSmoke: SevenToSmoke }) {
    console.log(`====== SEVEN TO SMOKE ======`);
    console.log(`Battlers: ${sevenToSmoke.getDancersQueue().toString()}`);
    console.log(`Battle have finished: ${sevenToSmoke.getIsCompleted()}`);
    console.log(
      `${
        !!sevenToSmoke.getWinner()
          ? `The winner is: ${sevenToSmoke.getWinner()!.toString()}`
          : ''
      }`
    );
  }
}

export class SevenToSmokeParticipant extends Dancer {
  points: number;

  constructor(name: string) {
    super(name);
    this.points = 0;
  }

  toString() {
    return `${this.name}: ${this.points}`;
  }
}

export class SevenToSmoke {
  private static readonly TIME_LIMIT_IN_MINUTES = 30;
  private static readonly MAX_POINTS = 7;
  private static readonly PARTICIPANTS_REQUIRED = 8;

  private dancersQueue: Queue<SevenToSmokeParticipant>;
  private isCompleted: boolean;
  private winner: SevenToSmokeParticipant | null = null;

  constructor(dancers: SevenToSmokeParticipant[]) {
    SevenToSmoke.validateConstructorParams(dancers);

    this.dancersQueue = new Queue(dancers);
    this.isCompleted = false;
  }

  static validateConstructorParams(dancers: SevenToSmokeParticipant[]) {
    if (dancers.length !== SevenToSmoke.PARTICIPANTS_REQUIRED)
      throw new Error(
        `A Seven-to-Smoke can only have ${SevenToSmoke.PARTICIPANTS_REQUIRED} dancers`
      );
  }

  getWinner() {
    return this.winner;
  }

  getIsCompleted() {
    return this.isCompleted;
  }

  getDancersQueue() {
    return this.dancersQueue;
  }

  start() {
    let maxPoints = 0;
    let overalWinner: SevenToSmokeParticipant | null = null;
    let timeElapsedInMinutes = 0;

    /**
     * Typecasting since dancersQueue will always have minimally 6 dancers
     */
    let defender = this.dancersQueue.dequeue() as SevenToSmokeParticipant;
    let challenger = this.dancersQueue.dequeue() as SevenToSmokeParticipant;

    let round = 1;

    while (
      maxPoints < SevenToSmoke.MAX_POINTS &&
      timeElapsedInMinutes < SevenToSmoke.TIME_LIMIT_IN_MINUTES
    ) {
      SevenToSmokeLogger.logCurrentRoundInfo({
        round,
        defender,
        challenger,
        dancersQueue: this.dancersQueue,
      });
      const [winner, loser] = DanceBattle.battle(defender, challenger);
      winner.points++;

      SevenToSmokeLogger.logWinnerInfo({
        winner,
      });

      defender = winner;
      /**
       * Typecasting since dancersQueue will always have minimally 6 dancers
       */
      challenger = this.dancersQueue.dequeue() as SevenToSmokeParticipant;
      this.dancersQueue.enqueue(loser);

      if (winner.points > maxPoints) {
        overalWinner = winner;
        maxPoints = winner.points;
      }

      round++;
      timeElapsedInMinutes += DanceBattle.TIME_ELAPSED_PER_BATTLE_IN_MINUTES;
    }

    this.isCompleted = true;
    this.winner = overalWinner;
  }

  toString() {
    SevenToSmokeLogger.logSevenToSmokeInfo({ sevenToSmoke: this });
  }
}
