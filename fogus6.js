var _ = require('underscore');

function myLength(ary) {
  if (_.isEmpty(ary))
    return 0;
  else
    return 1 + myLength(_.rest(ary));
}

myLength([1, 2, 3]);
myLength(_.range(10));
myLength([]);
myLength(_.range(1000));

var a = _.range(10);

myLength(a);

a;

function cycle(times, ary) {
  if (times <= 0)
    return [];
  else
    return cat(ary, cycle(times - 1, ary));
}

cycle(2, [5, 6, 7]);

_.take(cycle(20, [2, 3, 4]), 11);

_.zip(['a', 'b', 'c'], [1, 2, 3]);

var zipped1 = [
  ['a', 1]
];

function constructPair(pair, rests) {
  return [construct(_.first(pair), _.first(rests)),
    construct(second(pair), second(rests))
  ];
}

constructPair(['a', 1], [
  [],
  []
]);

_.zip(['a'], [1]);

_.zip.apply(null, constructPair(['a', 1], [
  [],
  []
]));

constructPair(['a', 1],
  constructPair(['b', 2],
    constructPair(['c', 3], [
      [],
      []
    ])));

function unzip(pairs) {
  if (_.isEmpty(pairs)) return [
    [],
    []
  ];

  return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}


unzip(_.zip([1, 2, 3], [4, 5, 6]));


var influences = [
  [
    'Lisp',
    'Smalltalk'
  ],
  [
    'Lisp',
    'Scheme'
  ],
  [
    'Smalltalk',
    'Self'
  ],
  [
    'Scheme',
    'JavaScript'
  ],
  [
    'Scheme',
    'Lua'
  ],
  [
    'Self',
    'Lua'
  ],
  [
    'Self',
    'JavaScript'
  ]
];

function nexts(graph, node) {
  if (_.isEmpty(graph)) return [];

  var pair = _.first(graph);
  var from = _.first(pair);
  var to = second(pair);
  var more = _.rest(graph);

  if (_.isEqual(node, from))
    return construct(to, nexts(more, node));
  else
    return nexts(more, node);
}

nexts(influences, 'Lisp');

function depthSearch(graph, nodes, seen) {
  if (_.isEmpty(nodes)) return rev(seen);

  var node = _.first(nodes);
  var more = _.rest(nodes);

  if (_.contains(seen, node))
    return depthSearch(graph, more, seen);
  else
    return depthSearch(graph,
      cat(nexts(graph, node), more),
      construct(node, seen));
}

depthSearch(influences, ['Lisp'], []);
depthSearch(influences, ['Smalltalk', 'Self'], []);
depthSearch(construct(['Lua', 'Io'], influences), ['Lisp'], []);

function tcLength(ary, n) {
  var l = n ? n : 0;

  if (_.isEmpty(ary))
    return l;
  else
    return tcLength(_.rest(ary), l + 1);
}

tcLength(_.range(10));

function andify(/* preds */ ) {
  var preds = _.toArray(arguments);

  return function(/* args */ ) {
    var args = _.toArray(arguments);

    var everything = function(ps, truth) {
      if (_.isEmpty(ps))
        return truth;
      else
        return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
    };

    return everything(preds, true);
  }
}

var evenNums = andify(_.isNumber, isEven);

evenNums(1, 2);
evenNums(2, 4, 6, 8);
evenNums(2, 4, 6, 8, 9);



function orify(/* preds */ ) {
  var preds = _.toArray(arguments);

  return function(/* args */ ) {
    var args = _.toArray(arguments);

    var something = function(ps, truth) {
      if (_.isEmpty(ps))
        return truth;
      else
        return _.some(args, _.first(ps)) || something(_.rest(ps), truth);
    };

    return something(preds, false);
  }
}

var zeroOrOdd = orify(isOdd, zero);

zeroOrOdd();
zeroOrOdd(0, 2, 4, 6);
zeroOrOdd(2, 4, 6);

function evenSteven(n) {
  if (n === 0)
    return true;
  else
    return oddJohn(Math.abs(n) - 1);
}

function oddJohn(n) {
  if (n === 0)
    return false;
  else
    return evenSteven(Math.abs(n) - 1);
}

evenSteven(4);
oddJohn(11);

function flat(array) {
  if (_.isArray(array))
    return cat.apply(cat, _.map(array, flat));
  else
    return [array];
}

flat([
  [1, 2],
  [3, 4]
]);
flat([
  [1, 2],
  [3, 4, [5, 6, [
    [
      [7]
    ]
  ], 8]]
]);

var x = [{
  a: [1, 2, 3],
  b: 42
}, {
  c: {
    d: []
  }
}];

var y = _.clone(x);

y;

x[1]['c']['d'] = 100000;

y;


function deepClone(obj) {
  if (!existy(obj) || !_.isObject(obj))
    return obj;

  var temp = new obj.constructor();
  for (var key in obj)
    if (obj.hasOwnProperty(key))
      temp[key] = deepClone(obj[key]);

  return temp;
}

var y = deepClone(x);

_.isEqual(x, y);

y[1]['c']['d'] = 42;


function visit(mapFun, resultFun, array) {
  if (_.isArray(array))
    return resultFun(_.map(array, mapFun));
  else
    return resultFun(array);
}

visit(_.identity, _.isNumber, 42);
visit(_.isNumber, _.identity, [1, 2, null, 3]);
visit(function(n) {
  return n * 2;
}, rev, _.range(10));

function postDepth(fun, ary) {
  return visit(partial1(postDepth, fun), fun, ary);
}

function preDepth(fun, ary) {
  return visit(partial1(preDepth, fun), fun, fun(ary));
}
f;

postDepth(_.identity, influences);

postDepth(function(x) {
  if (x === 'Lisp')
    return 'LISP';
  else
    return x;
}, influences);

influences;

function influencedWithStrategy(strategy, lang, graph) {
  var results = [];

  strategy(function(x) {
    if (_.isArray(x) && _.first(x) === lang)
      results.push(second(x));

    return x;
  }, graph);

  return results;
}

influencedWithStrategy(postDepth, 'Lisp', influences);

evenSteven(1000000);

function evenOline(n) {
  if (n === 0)
    return true;
  else
    return partial1(oddOline, Math.abs(n) - 1);
}

function oddOline(n) {
  if (n === 0)
    return false;
  else
    return partial1(evenOline, Math.abs(n) - 1);
}

evenOline(0);
oddOline(0);

oddOline(3);
oddOline(3)()()();

oddOline(200000001)()()();

function trampoline(fun /*, args */ ) {
  var result = fun.apply(fun, _.rest(arguments));

  while (_.isFunction(result)) {
    result = result();
  }

  return result;
}

trampoline(oddOline, 3);
trampoline(evenOline, 200000);
trampoline(oddOline, 30000);
trampoline(evenOline, 2000000);

function isEvenSafe(n) {
  if (n === 0)
    return true;
  else
    return trampoline(partial1(oddOline, Math.abs(n) - 1));
}

function isOddSafe(n) {
  if (n === 0)
    return false;
  else
    return trampoline(partial1(evenOline, Math.abs(n) - 1));
}
f;

isOddSafe(200001);
isEvenSafe(20001);

_.take(cycle(20, [1, 2, 3]), 11);

function generator(seed, current, step) {
  return {
    head: current(seed),
    tail: function() {
      console.log('forced');
      return generator(step(seed), current, step);
    }
  };
}

function genHead(gen) {
  return gen.head;
}

function genTail(gen) {
  return gen.tail();
}

var ints = generator(0, _.identity, function(n) {
  return n + 1;
});

genHead(ints);
genTail(ints);

genTail(genTail(ints));

function genTake(n, gen) {
  var doTake = function(x, g, ret) {
    if (x === 0)
      return ret;
    else
      return partial(doTake, x - 1, genTail(g), cat(ret, genHead(g)));
  };

  return trampoline(doTake, n, gen, []);
}
f;

genTake(10, ints);
genTake(100, ints);
genTake(1000, ints);

function asyncGetAny(interval, urls, onsuccess, onfailure) {
  var n = urls.length;

  var looper = function(i) {
    setTimeout(function() {
      if (i >= n) {
        onfailure('failed');
        return;
      }

      $.get(urls[i], onsuccess)
        .always(function() {
          console.log('try ' + urls[i]);
        })
        .fail(function() {
          looper(i + 1);
        });

    }, interval);
  };

  looper(0);
  return 'go';
}


var groupFrom = curry2(_.groupBy)(_.first);
var groupTo = curry2(_.groupBy)(second);

groupFrom(influences);
groupTo(influences);

function influenced(graph, node) {
  return _.map(groupFrom(graph)[node], second);
}

influencedWithStrategy(preDepth, 'Lisp', influences);
influenced(influences, 'Lisp');
