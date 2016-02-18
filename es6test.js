'use strict';

function f(x, y) {
  return x + y;
}

f(3, 2)

var arr1 = [0, 1, 2]
var arr2 = [3, 4, 5]
arr1.push(...arr2)
arr1;

var s = new Set()
s.add('hello').add('goodbye').add('hello')
s.size === 2;
s.has("hello") === true;

var m = new Map()
m.set('hello', 42)
m.set(s, 34)
m.get(s) == 34

var wm = new WeakMap()
wm.set(s, {
  extra: 42
})
wm.size

var ws = new WeakSet()
ws.add({
  data: 42
})
ws.get

Array.from(document.querySelectorAll('*'))
Array.of(1, 2, 3);
[0, 0, 0].fill(7, 1);
[1, 2, 3].find(x => x == 3);
[1, 2, 3].findIndex(x => x == 2);
[1, 2, 3, 4, 5].copyWithin(3, 0);
["a", "b", "c"].entries();
["a", "b", "c"].keys();

function fibo(n) {
  'use strict';
  let previous = 0;
  let current = 1;

  for (let i = 0; i < n; i += 1) {
    let temp = previous;
    previous = current;
    current = temp + current;
  }

  return current;
}

fibo(11)
