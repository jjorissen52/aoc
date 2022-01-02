`
MIT (c) Chao Wang hit9@icloud.com
https://github.com/hit9/heapq.js
`;

interface Cmp<T> {
  (a: T, b: T): boolean;
}

function lessThan<T>(x: T, y: T) {
  return x < y;
}

export class HeapQ<T> {
  private readonly heap: T[];
  private readonly cmp: Cmp<T>;

  get length(): number {
    return this.heap.length;
  }

  /**
   * Defaults to a min heap with a basic < comparison.
   * @param cmp operation to compare elements of the tree
   */
  constructor(cmp?: Cmp<T>) {
    this.heap = <T[]>[];
    this.cmp = cmp ?? lessThan;
  }

  // Push an item on the heap, O(log n)
  push(item: T) {
    this.heap.push(item);
    this.siftDown(0, this.heap.length - 1);
  }

  // pop the smallest item from heap, O(log n)
  pop(): T {
    if (this.length === 0) throw new Error("Empty Heap");
    const last = this.heap.pop() as T;

    if (this.heap.length > 0) {
      const head = this.heap[0];
      // @ts-ignore
      this.heap[0] = last;
      this.siftUp(0);
      return head;
    } else {
      return last;
    }
  }

  top() {
    if (this.heap.length !== 0) return this.heap[0];
  }

  siftDown(startIdx: number, idx: number) {
    const item = this.heap[idx];

    while (idx > startIdx) {
      const parentIdx = (idx - 1) >> 1;
      const parentItem = this.heap[parentIdx];
      if (this.cmp(item, parentItem)) {
        this.heap[idx] = parentItem;
        idx = parentIdx;
        continue;
      }
      break;
    }

    this.heap[idx] = item;
  }

  siftUp(idx: number) {
    const endIdx = this.heap.length;
    const startIdx = idx;
    const item = this.heap[idx];

    let childIdx = idx * 2 + 1;

    while (childIdx < endIdx) {
      const rightIdx = childIdx + 1;

      if (
        rightIdx < endIdx &&
        !this.cmp(this.heap[childIdx], this.heap[rightIdx])
      ) {
        childIdx = rightIdx;
      }
      this.heap[idx] = this.heap[childIdx];
      idx = childIdx;
      childIdx = idx * 2 + 1;
    }

    this.heap[idx] = item;
    this.siftDown(startIdx, idx);
  }
}
