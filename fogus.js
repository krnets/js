var _ = require('underscore');

function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  };
}

var addArrayElements = splat(function(x, y) {
  return x + y;
});

addArrayElements([1, 2]);

function unsplat(fun) {
  return function() {
    return fun.call(null, _.toArray(arguments));
  };
}

var joinElements = unsplat(function(array) {
  return array.join(' ');
});

joinElements('a', 'b');

function parseAge(age) {
  if (!_.isString(age)) fail('Expecting a string');
  var a;

  note('Attempting to parse an age');
  a = parseInt(age, 10);

  if (!_.isNaN(a)) {
    warn(age);
    a = 0;
  }

  return a;
}

function fail(thing) {
  throw new Error(thing);
}

function warn(str) {
  console.log(str + " That doesn't look like a valid age");
}

function note() {}

parseAge('42');

var letters = ['a', 'b', 'c'];
letters[1];

function naiveNth(a, index) {
  return a[index];
}

naiveNth(letters, 1);
naiveNth({}, 1);

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
  if (!_.isNumber(index)) fail('Expected a number as the index');
  if (!isIndexed(a)) fail('Not supported on non-indexed type');
  if ((index < 0) || (index > a.length - 1))
    fail('Index value is out of bounds');

  return a[index];
}

function second(a) {
  return nth(a, 1);
}

function compareLessThanOrEqual(x, y) {
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}

function lessOrEqual(x, y) {
  return x <= y;
}

[2, 3, -1, -6, 0, -108, 42, 10].sort(lessOrEqual)

function comparator(pred) {
  return function(x, y) {
    if (truthy(pred(x, y)))
      return -1;
    else if (truthy(pred(y, x)))
      return 1;
    else
      return 0;
  }
}


function lameCSV(str) {
  return _.reduce(str.split("\n"), function(table, row) {
    table.push(_.map(row.split(","), function(c) {
      return c.trim()
    }));
    return table;
  }, []);
}

var peopleTable = lameCSV("name,age,hair\nMerble,35,red\nBob,64,blonde");

peopleTable;
_.rest(peopleTable).sort();

function selectNames(table) {
  return _.rest(_.map(table, _.first));
}

function selectAges(table) {
  return _.rest(_.map(table, second));
}

function selectHairColor(table) {
  return _.rest(_.map(table, function(row) {
    return nth(row, 2);
  }));
}

var mergeResults = _.zip;

selectNames(peopleTable)
selectAges(peopleTable)
selectHairColor(peopleTable)

mergeResults(selectNames(peopleTable), selectAges(peopleTable))


//

function existy(x) {
  return x != null;
}

existy(null)
existy(undefined)
existy({}.notHere)
existy((function() {})())
existy(0)
existy(false)

function truthy(x) {
  return (x !== false) && existy(x);
}

truthy(false)
truthy(undefined)
truthy(0)
truthy('')

function doWhen(cond, action) {
  if (truthy(cond))
    return action();
  else
    return undefined;
}

function executeIfHasField(target, name) {
  return doWhen(existy(target[name]), function() {
    var result = _.result(target, name);
    console.log(['The result is', result].join(' '));
    return result;
  });
}

executeIfHasField([1, 2, 3], 'reverse');
executeIfHasField({
  foo: 42
}, 'foo');
executeIfHasField([1, 2, 3], 'notHere');

[null, undefined, 1, 2, false].map(existy);
[null, undefined, 1, 2, false].map(truthy);

var fortytwo = function() {
  return 42
}
fortytwo();

function weirdAdd(n, f) {
  return n + f()
};
weirdAdd(42, function() {
  return 9
});

_.each(['whiskey', 'tango', 'foxtrot'], function(word) {
  console.log(word.charAt(0).toUpperCase() + word.substr(1));
});

var lyrics = [];

for (var bottles = 99; bottles > 0; bottles--) {
  lyrics.push(bottles + " bottles of beer on the wall");
  lyrics.push(bottles + " bottles of beer");
  lyrics.push("Take one down, pass it around");

  if (bottles > 1) {
    lyrics.push((bottles - 1) + " bottles of beer on the wall.");
  } else {
    lyrics.push("No more bottles of beer on the wall!");
  }
}

function lyricSegment(n) {
  return _.chain([])
    .push(n + " bottles of beer on the wall")
    .push(n + " bottles of beer")
    .push("Take one down, pass it around")
    .tap(function(lyrics) {
      if (n > 1)
        lyrics.push((n - 1) + " bottles of beer on the wall.");
      else
        lyrics.push("No more bottles of beer on the wall!");
    })

  .value();
}

lyricSegment(9);

function song(start, end, lyricGen) {
  return _.reduce(_.range(start, end, -1),
    function(acc, n) {
      return acc.concat(lyricGen(n));
    }, []);
}

song(99, 0, lyricSegment);

function Point2D(x, y) {
  this._x = x;
  this._y = y;
}

new Point2D(0, 1);

function Point3D(x, y, z) {
  Point2D.call(this, x, y);
  this._z = z;
}

new Point3D(10, -1, 100);
