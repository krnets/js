var _ = require('underscore');

aGlobalVariable = 'livin la vida global';

_.map(_.range(2), function() {
  return aGlobalVariable;
});

aGlobalVariable = 'wonderland';

function makeEmptyObject() {
  return new Object();
}

makeEmptyObject();

aVariable = 'Outer';

function afun() {
  var aVariable = 'Middle';

  return _.map([1, 2, 3], function(e) {
    var aVariable = 'Inner';

    return [aVariable, e].join(' ');
  });
}

afun();

// Dynamic scoping

var globals = {};

function makeBindFun(resolver) {
  return function(k, v) {
    var stack = globals[k] || [];
    globals[k] = resolver(stack, v);
    return globals;
  }
}

var stackBinder = makeBindFun(function(stack, v) {
  stack.push(v);
  return stack;
});

var stackUnbinder = makeBindFun(function(stack) {
  stack.pop();
  return stack;
});

var dynamicLookup = function(k) {
  var slot = globals[k] || [];
  return _.last(slot);
};

stackBinder('a', 1);
stackBinder('b', 100);

dynamicLookup('a');
globals;

stackBinder('a', '*');
dynamicLookup('a');
globals;
stackUnbinder('a');
dynamicLookup('a');

function f() {
  return dynamicLookup('a');
}

function g() {
  stackBinder('a', 'g');
  return f();
}

f();
g();
globals;

function globalThis() {
  return this;
}

globalThis();
globalThis.call('barnabas');
globalThis.apply('orsulak', []);

var nopeThis = _.bind(globalThis, 'nope');
nopeThis.call('wat');

var target = {
  name: 'the right value',
  aux: function() {
    return this.name;
  },
  act: function() {
    return this.aux();
  }
};


_.bindAll(target, 'aux', 'act');
target.act.call('wat');

// Simulating Closures

function whatWasTheLocal() {
  var CAPTURED = 'Oh hai';

  return function() {
    return 'The local was: ' + CAPTURED;
  }
}

var reportLocal = whatWasTheLocal();

function createScaleFunction(FACTOR) {
  return function(v) {
    return _.map(v, function(n) {
      return (n * FACTOR);
    });
  }
}

var scale10 = createScaleFunction(10);
scale10([1, 2, 3]);

function createWeirdScaleFunction(FACTOR) {
  return function(v) {
    this['FACTOR'] = FACTOR;
    var captures = this;

    return _.map(v, _.bind(function(n) {
      return (n * this['FACTOR']);
    }, captures));
  }
}

var weirdScale10 = createWeirdScaleFunction(10);

weirdScale10.call({}, [5, 6, 7]);

function makeAdder(CAPTURED) {
  return function(free) {
    return free + CAPTURED;
  }
}

var add10 = makeAdder(10);
add10(32);

var add1024 = makeAdder(1024);
add1024(11);

add10(98);

function averageDamp(FUN) {
  return function(n) {
    return average([n, FUN(n)]);
  }
}

var averageSq = averageDamp(function(n) {
  return n * n;
});

averageSq(10);



// Shadowing

var name = 'Fogus';
name;
var name = 'Renamed';
name;

var shadowed = 0;

function argShadow(shadowed) {
  return ['Value is', shadowed].join(' ');
}

argShadow(108);
shadowed;
argShadow();

function varShadow(shadowed) {
  var shadowed = 4320000;
  return ['Value is', shadowed].join(' ');
}

varShadow();

function captureShadow(SHADOWED) {
  return function(SHADOWED) {
    return SHADOWED + 1;
  }
}

var closureShadow = captureShadow(108);
closureShadow(2);

function complement(PRED) {
  return function() {
    return !PRED.apply(null, _.toArray(arguments));
  }
}

function isEven(n) {
  return (n % 2) === 0;
}

var isOdd = complement(isEven);
isOdd(2);
isOdd(413);

function isEven(n) {
  return false;
}

isEven(2);

isOdd(13);
isOdd(12);


function showObject(OBJ) {
  return function() {
    return OBJ;
  }
}

var o = {
  a: 42
};
var showO = showObject(o);

showO();

o.newField = 108;
showO();

var pingpong = (function() {
  var PRIVATE = 0;

  return {
    inc: function(n) {
      return PRIVATE += n;
    },
    dec: function(n) {
      return PRIVATE -= n;
    }
  };
})();

pingpong.inc(10);
pingpong.dec(7);

pingpong.div = function(n) {
  return PRIVATE / n;
};

// pingpong.div(3);
// ReferenceError: PRIVATE is not defined

// ----Closures as an Abstraction----

function plucker(FIELD) {
  return function(obj) {
    return (obj && obj[FIELD]);
  }
}

var best = {
  title: 'Infinite Jest',
  author: 'DWF'
};
var getTitle = plucker('title');
getTitle(best);

var books = [{
  title: 'Chthon'
}, {
  stars: 5
}, {
  title: 'Botchan'
}];

var third = plucker(2);
third(books);

_.filter(books, getTitle);
