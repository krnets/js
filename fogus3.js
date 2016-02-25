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









function plucker(FIELD) {
  return function(obj) {
    return (obj && obj[FIELD]);
  }
}






_.max([1, 2, 3, 4, 5]);

var people = [{
  name: 'Fred',
  age: 65
}, {
  name: 'Lucy',
  age: 36
}];

_.max(people, function(p) {
  return p.age;
});


function finder(valueFun, bestFun, coll) {
  return _.reduce(coll, function(best, current) {
    var bestValue = valueFun(best);
    var currentValue = valueFun(current);

    return (bestValue === bestFun(bestValue, currentValue)) ?
      best : current;
  });
}

finder(_.identity, Math.max, [1, 2, 3, 4, 5]);


finder(plucker('age'), Math.max, people);
