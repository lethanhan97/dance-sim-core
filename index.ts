interface BaseListNodeValue {
  toString: () => string;
}

class ListNode<T extends BaseListNodeValue> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next?: ListNode<T>) {
    this.value = value;
    this.next = !!next ? next : null;
  }
}

class Queue<T extends BaseListNodeValue> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  // O(n)
  constructor(queueArray: T[]) {
    let prev: ListNode<T>;

    this.length = queueArray.length;

    queueArray.forEach((item, i) => {
      const listNode = new ListNode(item);

      if (i === 0) {
        this.head = listNode;
      }

      if (i === queueArray.length - 1) {
        this.tail = listNode;
      }

      if (!!prev) {
        prev.next = listNode;
      }

      prev = listNode;
    });
  }

  // O(1)
  enqueue(item: T) {
    const listNode = new ListNode(item);

    if (this.head === null && this.tail === null) {
      this.head = listNode;
      this.tail = listNode;
    } else {
      /**
       * For a queue, if head is null taill will definitely be null
       * Thus, we can assume by passing the above check, tail won't be null
       *  */
      this.tail!.next = listNode;
      this.tail = listNode;
      this.length++;
    }
  }

  // O(1)
  dequeue() {
    if (this.head === null) {
      return null;
    }

    const result = this.head;

    this.head = this.head.next;
    result.next = null;
    this.length--;

    return result.value;
  }

  getLength() {
    return this.length;
  }

  // O(n)
  toString() {
    let items = [];

    let cur = this.head;

    while (cur) {
      items.push(`(${cur.value.toString()})`);

      cur = cur.next;
    }

    return items.join(' => ');
  }
}

// TODO Can consider splitting points from Dancer class
// since points is purely a SevenToSmoke concept. Can
// consider making a SevenToSmokeCompetitor that extends
// Dancer class
class Dancer {
  name: string;
  points: number;

  constructor(name: string) {
    this.name = name;
    this.points = 0;
  }

  toString() {
    return `${this.name}: ${this.points}`;
  }
}

class DanceBattle {
  static TIME_ELAPSED_PER_BATTLE = 2;

  // returns [winner, loser]
  static battle(dancer1: Dancer, dancer2: Dancer) {
    const randomNumber = Math.random();

    const winner = randomNumber > 0.5 ? dancer1 : dancer2;
    const loser = randomNumber <= 0.5 ? dancer1 : dancer2;

    return [winner, loser];
  }
}

class SevenToSmoke {
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

const sevenToSmoke = new SevenToSmoke([
  new Dancer('WhyXce'),
  new Dancer('Anfromvietnam'),
  new Dancer('Carina'),
  new Dancer('Van'),
  new Dancer('Jordan'),
  new Dancer('Aaron'),
  new Dancer('Timo'),
  new Dancer('Melise'),
]);

console.log(sevenToSmoke.toString());
sevenToSmoke.start();
console.log(sevenToSmoke.toString());
