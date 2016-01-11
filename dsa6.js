function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function LList() {
    this.head = new Node("head");
    this.head.next = this.head;
    this.find = find;
    this.insert = insert;
    this.display = display;
    // this.dispReverse = dispReverse;
    this.remove = remove;
    this.findPrevious = findPrevious;
    // this.findLast = findLast;
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current.previous;
    current.next = newNode;
}

function display() {
    var currNode = this.head;
    while (!(currNode.next == null) &&
           !(currNode.next.element == "dead")) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

// function dispReverse() {
    // var currNode = this.head;
    // currNode = this.findLast();
    // while (!(currNode.previous == null)) {
        // console.log(currNode.element);
        // currNode = currNode.previous;

function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) &&
           (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

// function findLast() {
    // var currNode = this.head;
    // while (!(currNode.next == null)) {
        // currNode = currNode.next;
    // }
    // return currNode;
// }

function remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
    }
}


function remove(item) {
    var currNode = this.find(item);
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.prevoius = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
}


var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();
console.log();
cities.dispReverse();
