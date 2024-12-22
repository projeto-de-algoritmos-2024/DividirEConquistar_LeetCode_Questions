function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    let allNodes: number[] = [];

    for (let list of lists) {
        let current = list;
        while (current !== null) {
            allNodes.push(current.val);
            current = current.next;
        }
    }

    allNodes.sort((a, b) => a - b);

    let dummy = new ListNode(-1);
    let current = dummy;

    for (let val of allNodes) {
        current.next = new ListNode(val);
        current = current.next;
    }

    return dummy.next;
}