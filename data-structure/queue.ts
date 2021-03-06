class TQueue<T> {
    private items: Array<T> = [];
    size(): number {
        return this.items.length;
    }

    enqueue(item: T) {
        this.items.push(item);
    }

    dequeue(): T {
        return this.items.shift();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    clear(): void {
        this.items.length = 0;
    }

    peek(): T {
        return this.items[0];
    }

}


const tqueue = new TQueue<string>();

tqueue.enqueue('z');
tqueue.enqueue('z');
tqueue.enqueue('p');

console.log(tqueue.peek());

tqueue.dequeue();
tqueue.dequeue();
console.log(tqueue.peek());

