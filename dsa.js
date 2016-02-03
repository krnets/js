// print("\n");

var number = 1;
var sum = 0;
while (number < 11) {
    sum += number;
    ++number;
}
// print(sum);

function factorial(number) {
    var product = 1;
    for (var i = number; i >= 1; --i) {
        product *= i;
    }
    return product;
}

// print(factorial(4));
// print(factorial(5));
// print(factorial(10));

function curve(arr, amount) {
    for (var i = 0; i < arr.length; ++i) {
        arr[i] += amount;
    }
}

var grades = [77, 73, 74, 81, 90];
curve(grades, 5);
// print(grades);

function showScope() {
    var scope = "local";
    return scope;
}

var scope = "global";
// print(scope);
// print(showScope());
// print(scope);


function Checking(amount) {
    this.balance = amount;
    this.deposit = deposit;
    this.withdraw = withdraw;
    this.toString = toString;
}

function deposit(amount) {
    this.balance += amount;
}

function withdraw(amount) {
    if (amount <= this.balance) {
        this.balance -= amount;
    }
    if (amount > this.balance) {
        console.log("Insufficient funds");
    }
}

function toString() {
    return "Balance: " + this.balance;
}

var account = new Checking(500);
account.deposit(1000);
// print(account.toString());
account.withdraw(750);
// print(account.toString());
// account.withdraw(800);
// print(account.toString());

var numbers = [];
// print(numbers.length);
var numbers = [1,2,3,4,5];
// print(numbers.length);

var numbers = new Array();
// print(numbers.length);

// Chapter 2

var sentence = "the quick brown fox jumped over the lazy dog";
var words = sentence.split(" ");
for (var i = 0; i < words.length; ++i) {
    console.log("word " + i + ": " + words[i]);
}

var nums = [];
for (var i = 0; i < 10; ++i) {
    nums[i] = i+1;
}
var samenums = nums;
nums[0] = 400;
console.log(samenums[0]);

function copy(arr1, arr2) {
    for (var i = 0; i < arr1.length; ++i) {
        arr2[i] = arr1[i];
    }
}


var nums = [];
for (var i = 0; i < 10; ++i) {
    nums[i] = i+1;
}
var samenums = [];
copy(nums, samenums);
nums[0] = 400;
console.log(samenums[0]);

var nums = [1,2,3,4,5];
console.log(nums);
nums.push(6);
console.log(nums);

function compare(num1, num2) {
    return num1 - num2;
}

var nums = [3,1,2,100,4,200];
nums.sort(compare);

function square(num) {
    console.log(num, num * num);
}

var nums = [1,2,3,4,5,6,7,8,9,10];
nums.forEach(square);

function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = []; // init empty array to store elems
    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.contains = contains;
}

function currPos() {
    return this.pos;
}

function moveTo(position) {
    this.pos = position;
}

function getElement() {
    return this.dataStore[this.pos];
}

function prev() {
    if (this.pos > 0) {
        --this.pos;
    }
    else {
        return false;
    }
}

function next() {
    if (this.pos < this.listSize-1) {
        ++this.pos;
    }
    else {
        return false;
    }
}

function front() {
    this.pos = 0;
}

function end() {
    this.pos = this.listSize-1;
}

function contains(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
            return true;
        }
    }
    return false;
}

function clear() {
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
}

function insert(element, after) {
    var insertPos = this.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos+1, 0, element);
        ++this.listSize;
        return true;
    }
    return false;
}

function append(element) {
    this.dataStore[this.listSize++] = element;
}

function find(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
            return i;
        }
    }
    return -1;
}

function remove(element) {
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt,1);
        --this.listSize;
        return true;
    }
    return false;
}

function length() {
    return this.listSize;
}

function toString() {
    return this.dataStore;
}

var names = new List();
names.append("Clayton");
names.append("Raymond");
names.append("Cynthia");
names.append("Barbara");
names.append("Jennifer");
names.append("Bryan");
names.append("Danny");



// Chapter 3 - continuation

fs = require ('fs');
var movies = fs.readFileSync('films.txt', 'utf8').split("\n");

function createArr(file) {
    var arr = fs.readFileSync(file, 'utf8').split("\n");
    for (var i = 0; i < arr.length; ++i) {
        arr[i] = arr[i].trim();
    }
    return arr;
}

var movieList = new List();
for (var i = 0; i < movies.length; ++i) {
    movieList.append(movies[i]);
}

function displayList(list) {
    for (list.front; list.currPos < list.length; ++list) {
        if (list.getElement instanceof Customer) {
            console.log(list.getElement["name"] + ", " +
                       list.getElement["movie"]);
        }
        else {
            console.log(list.getElement);
        }
    }
}

function Customer(name, movie) {
    this.name = name;
    this.movie = movie;
}

function checkOut(name, movie, filmList, customerList) {
    if (movieList.contains(movie)) {
        var c = new Customer(name, movie);
        customerList.append(c);
        filmList.remove(movie);
    }
    else {
        console.log(movie + " is not available.")
    }
}

// console.log("Available movies: \n");
// displayList(movieList);
// checkOut("Jane Doe", "The Godfather", movieList, customers);
// console.log("\nCustomer Rentals: \n");
// displayList(customers);



// Chapter 4

 
