import { BaseListNodeValue, ListNode } from './list-node';

export class Queue<T extends BaseListNodeValue> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length = 0;

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
    const items = [];

    let cur = this.head;

    while (cur) {
      items.push(`(${cur.value.toString()})`);

      cur = cur.next;
    }

    return items.join(' => ');
  }
}
