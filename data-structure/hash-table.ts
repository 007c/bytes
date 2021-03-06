import { ListNode, LinkList } from './link-list';

class NodeItem extends ListNode {
    value: any;
    constructor(key: string, val: string) {
        super(key);
        this.value = val;
    }
}

interface Items {
    [props: string]: LinkList;
}

class HashTable {
    protected items: Items = {};
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

    entries() {
        let keys = Object.keys(this.items);
        let entries = "";
        for(let item of keys){
            entries += item + ': [';
            let head = this.items[item].head;
            while(head){
                entries += head.val + '=>' + head.value + ',';
                head = head.next;
            }
            entries = entries.slice(0, -1);
            entries += '],';
        }
        return entries.slice(0, -1);
    }
}

class HashTableSpreadChain extends HashTable {
    put(key: string, value: any) {
        const hashCode = this.hashCode(key);
        if (!this.items[hashCode]) {
            this.items[hashCode] = new LinkList();
        }
        let linkList = this.items[hashCode];
        let current = linkList.head;
        const node = new NodeItem(key, value);
        let nodeIndex = linkList.indexOf(key);
        if(nodeIndex === -1){
            linkList.append(node);
        }else{
            let node = linkList.getElementAt(nodeIndex);
            node.value = value;
        }
    }

    get(key: string): any {
        let hashCode = this.hashCode(key);
        if (!this.items[hashCode]) {
            return null;
        }

        let head = this.items[hashCode].head;
        while (head) {
            if (head.val === key) {
                return head.value;
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
        let linkList = this.items[hashCode];
        let nodeIndex = linkList.indexOf(key);
        if(nodeIndex === -1){
            return;
        }

        linkList.removeAt(nodeIndex);
        if(linkList.isEmpty()){
            delete this.items[hashCode];
        }
    }
}


const hashTable = new HashTableSpreadChain();
hashTable.put('zzp', 25);
hashTable.put('lihongwang', 45);
hashTable.put('yihuli', 36);
hashTable.put('Sue', 38);
hashTable.put('Aethelwulf', 98);
hashTable.put('master', 25);
hashTable.put('master', 28);

console.log(hashTable.entries())

console.log(hashTable.get('zzp'))
console.log(hashTable.get('yihuli'))
console.log(hashTable.get('wangmuba'))
console.log(hashTable.get('Sue'))
console.log(hashTable.get('Aethelwulf'))
console.log(hashTable.get('master'))
hashTable.remove('Aethelwulf');
hashTable.remove('master')
hashTable.remove('Sue')
console.log(hashTable.get('Aethelwulf'))
console.log(hashTable.get('master'))
console.log(hashTable.entries())