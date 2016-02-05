function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode; 
}
