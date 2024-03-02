type NodeOrNull = DLinkedListNode | null;

class DLinkedListNode {
    prevNode: NodeOrNull;
    nextNode: NodeOrNull;
    value: number;

    constructor (prevNode: NodeOrNull, nextNode: NodeOrNull, value: number) {
        this.prevNode = prevNode;
        this.nextNode = nextNode;
        this.value = value;
    }
}

class DLinkedList {
    _head: NodeOrNull = null;
    _tail: NodeOrNull = null;
    _size: number = 0;

    search (value: number) {
        let node: NodeOrNull = this._head;
        while (node) {
            if (node.value === value) {
                return node;
            };
            node = node.nextNode;
        };
        return null;
    }

    addFirst (value: number) {
        let newNode: DLinkedListNode;
        if (!this._head) {
            newNode = new DLinkedListNode(null, null, value);
            this._tail = newNode;
        } else {
            newNode = new DLinkedListNode(null, this._head, value);
            this._head.prevNode = newNode;
        }
        this._head = newNode;
        this._size++;
    }

    addEnd (value: number) {
        let newNode: DLinkedListNode;
        if (!this._head) {
            newNode = new DLinkedListNode(null, null, value);
            this._head = newNode;
        } else {
            newNode = new DLinkedListNode(this._tail, null, value);
            this._tail.nextNode = newNode;
        }
        this._tail = newNode;
        this._size++;
    }

    insert (prevNodeValue: number, value: number) {
        let prevNode = this.search(prevNodeValue);
        if (prevNode) {
            let node = new DLinkedListNode(prevNode, prevNode.nextNode, value);
            prevNode.nextNode = node;
            if (node.nextNode) {
                node.nextNode.prevNode = node;
            } else {
                this._tail = node;
            };
            this._size++;
        };
    }

    update (nodeValue: number, newValue: number) {
        let node = this.search(nodeValue);
        if (node) {
            let newNode = new DLinkedListNode(node.prevNode, node.nextNode, newValue);
            if (node.prevNode) { node.prevNode.nextNode = newNode; };
            if (node.nextNode) { node.nextNode.prevNode = newNode; };
            if (this._head == node) { this._head = newNode };
            if (this._tail == node) { this._tail = newNode };
            node.prevNode = node.nextNode = null;
        } else {
            return 'Not found'
        };  
    }

    delete (nodeValue: number) {
        let node = this.search(nodeValue);
        if (node) {
            this._size--
            if (this._size === 0) {
                this._head = null;
                this._tail = null;
            } else {
                if (node.nextNode) {
                    node.nextNode.prevNode = node.prevNode;
                } else {
                    this._tail = node.prevNode;
                };
                if (node.prevNode) {
                    node.prevNode.nextNode = node.nextNode;
                } else {
                    this._head = node.nextNode;
                };
            };
        };
    }

    size () {
        return this._size
    }
}

