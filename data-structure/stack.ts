class Stack<T> {
    private items: Array<T> = []
    push(item: T): void {
        this.items.push(item);
    }
    pop(): T {
        return this.items.pop();
    }
    peek(): T {
        return this.items[this.items.length - 1];
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    clear(): void {
        this.items.length = 0;
    }
    size(): number {
        return this.items.length;
    }
}

const stack = new Stack<number>();
console.log(stack.isEmpty())
stack.push(1);
console.log(stack.isEmpty())
stack.push(2);
stack.push(4);
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.peek());
stack.push(47);
console.log(stack.pop());

//十进制转为二进制
const decimalToBinary = function (decimal: number): string {
    const stack = new Stack<number>();

    while (decimal > 0) {
        let rem = decimal % 2;
        stack.push(rem);
        decimal = Math.floor(decimal / 2);
    }

    let binary = "";
    while (!stack.isEmpty()) {
        binary += stack.pop();
    }

    return binary;
}

console.log(decimalToBinary(12))