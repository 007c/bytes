import { ListNode, LinkList } from './link-list';

class NodeItem extends ListNode {
    key: string;
    constructor(key: string, val: string) {
        super(val);
        this.key = key;
    }
}

class HashTable {
    protected items: Object = {};
    put(key: string, value: any): void {
        let hashCode = this.hashCode(key);
        this.items[hashCode] = value;
    }
    protected hashCode(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key[i].charCodeAt(0);
        }

        hash %= 37;
        return hash;
    }
    get(key: string): any {
        const hashCode = this.hashCode(key);
        return this.items[hashCode];
    }
    remove(key: string) {
        const hashCode = this.hashCode(key);
        delete this.items[hashCode];
    }
}

class HashTableSpreadChain extends HashTable {
    put(key: string, value: any) {
        const hashCode = this.hashCode(key);
        if (!this.items[hashCode]) {
            this.items[hashCode] = new LinkList();
        }
        let current = this.items[hashCode].head;
        const node = new NodeItem(key, value);
        if (!current) {
            this.items[hashCode].head = node
        } else {
            while (current.next) {
                if (current.key === key) {
                    current.val = value;
                    return;
                }
                current = current.next;
            }
            current.next = node
        }
    }

    get(key: string): any {
        let hashCode = this.hashCode(key);
        if (!this.items[hashCode]) {
            return null;
        }

        let head = this.items[hashCode].head;
        while (head) {
            if (head.key === key) {
                return head.val;
            }
            head = head.next;
        }
        return null;
    }

    remove(key: string) {
        let hashCode = this.hashCode(key);
        if (!this.items[hashCode]) {
            return;
        }
        let head = this.items[hashCode].head;
        let prev = null;
        while (head) {
            if (head.key === key) {
                if (!prev) {
                    this.items[hashCode].head = head.next;

                } else {
                    prev.next = head.next;
                }
                return;
            }
            prev = head;
            head = head.next;
        }
    }
}


const hashTable = new HashTableSpreadChain();
hashTable.put('zzp', 25);
hashTable.put('lihongwang', 45);
hashTable.put('yihuli', 36);
hashTable.put('Sue', 38);
hashTable.put('Aethelwulf', 98);


console.log(hashTable.get('zzp'))
console.log(hashTable.get('yihuli'))
console.log(hashTable.get('wangmuba'))
console.log(hashTable.get('Sue'))
console.log(hashTable.get('Aethelwulf'))
hashTable.remove('Aethelwulf');

console.log(hashTable.get('Aethelwulf'))