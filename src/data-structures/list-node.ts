export interface BaseListNodeValue {
  toString: () => string;
}

export class ListNode<T extends BaseListNodeValue> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next?: ListNode<T>) {
    this.value = value;
    this.next = !!next ? next : null;
  }
}
