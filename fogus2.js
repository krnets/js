var _ = require('underscore');

var nums = [1, 2, 3, 4, 5];

function doubleAll(array) {
  return _.map(array, function(n) {
    return n * 2
  });
}

doubleAll(nums);

function average(array) {
  var sum = _.reduce(array, function(a, b) {
    return a + b
  });
  return sum / _.size(array);
}

average(nums);

function onlyEven(array) {
  return _.filter(array, function(n) {
    return (n % 2) === 0;
  })
}

onlyEven(nums);

_.map({
  a: 1,
  b: 2
}, _.identity);

_.map({
  a: 1,
  b: 2
}, function(v, k, coll) {
  return [k, v, _.keys(coll)];
});


// reduceRight
var nums = [100, 2, 25];

function div(x, y) {
  return x / y
}

_.reduce(nums, div);

_.reduceRight(nums, div);

function allOf() {
  return _.reduceRight(arguments, function(truth, f) {
    return truth && f();
  }, true)
}

function anyOf() {
  return _.reduceRight(arguments, function(truth, f) {
    return truth || f();
  }, false);
}

function T() {
  return true
}

function F() {
  return false
}

allOf();
allOf(T, T);
allOf(T, T, T, T, F);
anyOf(T, T, F);
anyOf(F, F, F, F);
anyOf();

//
_.find(['a', 'b', 3, 'd'], _.isNumber);
_.reject(['a', 'b', 3, 'd'], _.isNumber);

function complement(pred) {
  return function() {
    return !pred.apply(null, _.toArray(arguments));
  }
}

_.filter(['a', 'b', 3, 'd'], (_.isNumber));
_.filter(['a', 'b', 3, 'd'], complement(_.isNumber));

_.all([1, 2, 3, 4], _.isNumber);
_.any([1, 2, 'c', 4], _.isString);
_.all([1, 2, 3, 4], _.isString);

var people = [{
  name: "Rick",
  age: 30
}, {
  name: "Jaka",
  age: 24
}];

_.sortBy(people, function(p) {
  return p.age
});

var
  albums = [{
    title: "Sabbath Bloody Sabbath",
    genre: "Metal"
  }, {
    title: "Scientist",
    genre: "Dub"
  }, {
    title: "Undertow",
    genre: "Metal"
  }];

_.groupBy(albums, function(a) {
  return a.genre
})

_.countBy(albums, function(a) {
  return a.genre
})


function existy(x) {
  return x != null;
}

function truthy(x) {
  return (x !== false) && existy(x);
}


// ..

function cat() {
  var head = _.first(arguments);
  if (existy(head))
    return head.concat.apply(head, _.rest(arguments));
  else
    return []
}

cat([1, 2, 3], [4, 5], [6, 7, 8]);


function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

construct(42, [1, 2, 3])


function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}

mapcat(function(e) {
  return construct(e, [","]);
}, [1, 2, 3])


function butLast(coll) {
  return _.toArray(coll).slice(0, -1)
}

butLast([1, 2, 3, 4, 5])

function interpose(inter, coll) {
  return butLast(mapcat(function(e) {
      return construct(e, [inter])
    },
    coll))
}

interpose("^", [1, 2, 3])

var zombie = {
  name: "Bub",
  film: "Day of the Dead"
}

_.keys(zombie)
_.values(zombie)

_.pluck([{
    title: "Chton",
    author: "Anthony"
  }, {
    title: "Grendel",
    author: "Gardner"
  }, {
    title: "After Dark"
  }],
  'author');

_.pairs(zombie)

_.object(_.map(_.pairs(zombie), function(pair) {
  return [pair[0].toUpperCase(), pair[1]]
}))

_.invert(zombie)

_.keys(_.invert({
  a: 138,
  b: 9
}))

_.pluck(_.map([{
    title: "Chton",
    author: "Anthony"
  }, {
    title: "Grendel",
    author: "Gardner"
  }, {
    title: "After Dark"
  }],
  function(obj) {
    return _.defaults(obj, {
      author: "Unknown"
    })
  }), 'author')


var person = {
  name: "Romy",
  token: "j3983ij",
  pswd: "tigress"
}

var info = _.omit(person, 'token', 'pswd')
info
var creds = _.pick(person, 'token', 'pswd')
creds



var
  library = [{
    title: "SICP",
    isbn: "0262010771",
    ed: 1
  }, {
    title: "SICP",
    isbn: "0262510871",
    ed: 2
  }, {
    title: "Joy of Clojure",
    isbn: "1935182641",
    ed: 1
  }];

_.findWhere(
  library, {
    title: "SICP",
    ed: 2
  });

_.where(library, {
  title: "SICP"
})


function plucker(FIELD) {
  return function(obj) {
    return (obj && obj[FIELD])
  }
}






_.max([1, 2, 3, 4, 5])

var people = [{
  name: "Fred",
  age: 65
}, {
  name: "Lucy",
  age: 36
}]

_.max(people, function(p) {
  return p.age
})


function finder(valueFun, bestFun, coll) {
  return _.reduce(coll, function(best, current) {
    var bestValue = valueFun(best)
    var currentValue = valueFun(current)

    return (bestValue === bestFun(bestValue, currentValue)) ?
      best : current
  })
}

finder(_.identity, Math.max, [1, 2, 3, 4, 5])


finder(plucker('age'), Math.max, people)
