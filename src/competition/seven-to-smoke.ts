import { Queue } from '../data-structures/queue';
import { Dancer } from '../participants/dancer';
import { DanceBattle } from './dance-battle';

export class SevenToSmoke {
  private dancersQueue: Queue<Dancer>;
  private isCompleted: boolean;
  private winner: Dancer | null = null;

  constructor(dancers: Dancer[]) {
    // TODO Add validation to make sure only 8 dancers
    this.dancersQueue = new Queue(dancers);
    this.isCompleted = false;
  }

  start() {
    let maxPoints = 0;
    let overalWinner: Dancer | null = null;
    let timeElapsedInMinutes = 0;

    /**
     * Typecasting since dancersQueue will always have minimally 6 dancers
     */
    let defender = this.dancersQueue.dequeue() as Dancer;
    let challenger = this.dancersQueue.dequeue() as Dancer;

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
      challenger = this.dancersQueue.dequeue() as Dancer;
      this.dancersQueue.enqueue(loser);

      if (winner.points > maxPoints) {
        overalWinner = winner;
        maxPoints = winner.points;
      }

      round++;
      timeElapsedInMinutes += DanceBattle.TIME_ELAPSED_PER_BATTLE;

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
