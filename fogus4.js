var _ = require('underscore');

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
