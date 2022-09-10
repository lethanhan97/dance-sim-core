import { Queue } from '../data-structures/queue';
import { Dancer } from '../participants/dancer';
import { DanceBattle } from './dance-battle';

class SevenToSmokeParticipant extends Dancer {
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
  private dancersQueue: Queue<SevenToSmokeParticipant>;
  private isCompleted: boolean;
  private winner: SevenToSmokeParticipant | null = null;

  constructor(dancers: SevenToSmokeParticipant[]) {
    SevenToSmoke.validateConstructorParams(dancers);

    this.dancersQueue = new Queue(dancers);
    this.isCompleted = false;
  }

  static validateConstructorParams(dancers: SevenToSmokeParticipant[]) {
    if (dancers.length !== 8)
      throw new Error('A Seven-to-Smoke can only have 8 dancers');
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

    while (maxPoints < 7 && timeElapsedInMinutes < 30) {
      console.log(`================== ROUND ${round} ==================`);
      console.log(
        `Commence battle: ${defender?.toString()} vs ${challenger?.toString()}`
      );

      console.log();
      console.log('Dancers in the queue:');
      console.log(this.dancersQueue.toString());

      const [winner, loser] = DanceBattle.battle(defender, challenger);

      winner.points++;
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

      console.log();
      console.log(`Winner is: ${winner.toString()}`);
      console.log('=============================================');
      console.log();
    }

    this.isCompleted = true;
    this.winner = overalWinner;
  }

  toString() {
    console.log(`====== SEVEN TO SMOKE ======`);
    console.log(`Battlers: ${this.dancersQueue.toString()}`);
    console.log(`Battle have finished: ${this.isCompleted}`);
    console.log(
      `${!!this.winner ? `The winner is: ${this.winner.toString()}` : ''}`
    );
  }
}
