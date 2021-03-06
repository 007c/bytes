export class ListNode {
    val: string;
    next: ListNode;
    value?: any
    constructor(val: any) {
        this.val = val;
    }
}

export class LinkList {
    private count: number = 0;
    head: ListNode;
    append(node: ListNode): void {
        let current = this.head;
        if (!this.head) {
            this.head = node
        } else {
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    isEmpty(): boolean {
        return this.count === 0;
    }
    insertBefore(node: ListNode, pos: number): void {
        if (pos < 0) {
            return;
        }

        if (pos > this.count - 1) {
            return this.append(node);
        }

        let current = this.head;
        let prev = null;
        while (pos--) {
            prev = current;
            current = current.next;
        }
        if (!prev) {
            let next = this.head;
            this.head = node;
            node.next = next;
        } else {
            prev.next = node;
            node.next = current;
        }
        this.count++;
    }
    getElementAt(index): ListNode | null {
        if (index > this.count - 1 || index < 0) {
            return null;
        }
        let current = this.head;
        while (index--) {
            current = current.next;
        }
        return current;
    }

    remove(node: ListNode): ListNode | null {
        let current = this.head;
        let prev: ListNode = null;
        while (current) {
            if (current === node) {
                if (!prev) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.count--;
                return current;
            }
            prev = current;
            current = current.next;
        }
        return null;
    }

    removeAt(pos: number): ListNode | null {
        if (pos < 0 || pos > this.count - 1) {
            return null;
        }

        // let prev = null, current = this.head;
        // while (pos--) {
        //     prev = current;
        //     current = current.next;
        // }
        // if (!prev) {
        //     this.head = current.next;
        // } else {
        //     prev.next = current.next;
        // }

        let prev = this.getElementAt(pos - 1);
        let current;
        if (!prev) {
            this.head = this.head.next;
            current = this.head;
        } else {
            current = prev.next;
            prev.next = current.next;
        }

        this.count--;
        return current;
    }

    size(): number {
        return this.count;
    }

    indexOf(nodeVal) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.val === nodeVal) {
                return index;
            }
            index++;
            current = current.next;
        }

        return -1;
    }
}

// const linkList = new LinkList();
// linkList.append(new ListNode(1));
// linkList.append(new ListNode(2));
// linkList.append(new ListNode(3));
// const node = new ListNode(222);
// linkList.insertBefore(node, 0);
// console.log(linkList)
// linkList.removeAt(0);
// console.log(linkList)
// console.log(linkList.getElementAt(2))
// console.log('remove', linkList.remove(node))
// console.log(linkList.getElementAt(2), linkList.size(), linkList)