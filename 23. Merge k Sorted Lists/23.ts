class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  if (lists.length === 0) return null;

  function mergeTwoLists(
    l1: ListNode | null,
    l2: ListNode | null
  ): ListNode | null {
    let dummy = new ListNode(-1);
    let current = dummy;

    while (l1 !== null && l2 !== null) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }

    if (l1 !== null) current.next = l1;
    if (l2 !== null) current.next = l2;

    return dummy.next;
  }

  function divideAndConquer(
    lists: (ListNode | null)[],
    left: number,
    right: number
  ): ListNode | null {
    if (left === right) {
      return lists[left];
    }

    let mid = Math.floor((left + right) / 2);
    let leftList = divideAndConquer(lists, left, mid);
    let rightList = divideAndConquer(lists, mid + 1, right);

    return mergeTwoLists(leftList, rightList);
  }

  return divideAndConquer(lists, 0, lists.length - 1);
}
