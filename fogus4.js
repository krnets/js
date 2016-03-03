var _ = require('underscore');

_.max([1, 2, 3, 4, 5]);
_.max([1, 2, 3, 4.75, 4.5]);

var people = [{
  name: 'Lucy',
  age: 36
}, {
  name: 'Fred',
  age: 65
}, {
  name: 'Sam',
  age: 27
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

finder(_.identity, Math.max, [3, 2, 7, 4, 1]);


finder(plucker('age'), Math.max, people);

finder(plucker('name'),
  function(x, y) {
    return (x.charAt(0) === 'L') ? x : y;
  },
  people);


function best(fun, coll) {
  return _.reduce(coll, function(x, y) {
    return fun(x, y) ? x : y;
  });
}

best(function(x, y) {
  return x > y;
}, [1, 2, 3, 4, 5]);

function repeat(times, VALUE) {
  return _.map(_.range(times), function() {
    return VALUE;
  });
}

repeat(4, 'Major');

function repeatedly(times, fun) {
  return _.map(_.range(times), fun);
}

repeatedly(3, function() {
  return Math.floor((Math.random() * 10) + 1);
});

repeatedly(3, function() {
  return 'Odelay!';
});


function iterateUntil(fun, check, init) {
  var ret = [];
  var result = fun(init);

  while (check(result)) {
    ret.push(result);
    result = fun(result);
  }

  return ret;
}

iterateUntil(function(n) {
    return n + n;
  },
  function(n) {
    return n <= 1024;
  },
  1);

repeatedly(10, function(exp) {
  return Math.pow(2, exp + 1);
});

function always(VALUE) {
  return function() {
    return VALUE;
  }
}

var f = always(function() {});

f() === f();

var g = always(function() {});

f() === g();


repeatedly(3, always('Odelay!'));

function invoker(NAME, METHOD) {
  return function(target /* args ... */ ) {

    if (!existy(target)) fail('Must provide a target');

    var targetMethod = target[NAME];
    var args = _.rest(arguments);

    return doWhen((existy(targetMethod) && METHOD === targetMethod),
      function() {
        return targetMethod.apply(target, args);
      });
  }
}

var rev = invoker('reverse', Array.prototype.reverse);
_.map([
  [1, 2, 3]
], rev);


var add100 = makeAdder(100);
add100(38);


function uniqueString(len) {
  return Math.random().toString(36).substr(2, len);
}

uniqueString(10);

function uniqueStringWithPrefix(prefix) {
  return [prefix, new Date().getTime()].join('');
}

uniqueStringWithPrefix('argento');
uniqueStringWithPrefix('ghosts');

function makeUniqueStringFunction(start) {
  var COUNTER = start;

  return function(prefix) {
    return [prefix, COUNTER++].join('');
  }
}

var uniqueString = makeUniqueStringFunction(0);

uniqueString('dari');

var generator = {
  count: 0,
  uniqueString: function(prefix) {
    return [prefix, this.count++].join('');
  }
};

generator.uniqueString('bohr');
generator.count = 'gotcha';
generator.uniqueString.call({
  count: 1337
}, 'bohr');

var omgenerator = (function(init) {
  var COUNTER = init;

  return {
    uniqueString: function(prefix) {
      return [prefix, COUNTER++].join('');
    }
  };
})(0);

omgenerator.uniqueString('lichking-');

var nums = [1, 2, 3, null, 5];

_.reduce(nums, function(total, n) {
  return total * n;
});


function fnull(fun /* defaults */ ) {
  var defaults = _.rest(arguments);

  return function(/* args */ ) {
    var args = _.map(arguments, function(e, i) {
      return existy(e) ? e : defaults[i];
    });

    return fun.apply(null, args);
  }
}

var safeMult = fnull(function(total, n) {
  return total * n;
}, 1, 1);


_.reduce(nums, safeMult);

function defaults(d) {
  return function(o, k) {
    var val = fnull(_.identity, d[k]);
    return o && val(o[k]);
  }
}

function doSomething(config) {
  var lookup = defaults({
    critical: 108
  });

  return lookup(config, 'critical');
}


doSomething({
  critical: 9
});

doSomething({
  whoCares: 42,
  critical: null
});



function checker(/* validators */ ) {
  var validators = _.toArray(arguments);

  return function(obj) {
    return _.reduce(validators, function(errs, check) {
      if (check(obj))
        return errs;
      else
        return _.chain(errs).push(check.message).value();
    }, []);
  }
}

var alwaysPasses = checker(always(true), always(true));
alwaysPasses({});

var fails = always(false);
fails.message = 'a failure in life';
var alwaysFails = checker(fails);

alwaysFails({});

function validator(message, fun) {
  var f = function(/* args */ ) {
    return fun.apply(fun, arguments);
  };

  f['message'] = message;
  return f;
}

var gonnaFail = checker(validator('ZOMG!', always(false)));

gonnaFail(100);

function aMap(obj) {
  return _.isObject(obj);
}

var checkCommand = checker(validator('must be a map', aMap));

checkCommand({});

checkCommand(42);

function hasKeys() {
  var KEYS = _.toArray(arguments);

  var fun = function(obj) {
    return _.every(KEYS, function(k) {
      return _.has(obj, k);
    });
  };

  fun.message = cat(['Must have values for keys:'], KEYS).join(' ');
  return fun;
}

var checkCommand = checker(validator('must be a map', aMap),
  hasKeys('msg', 'type'));

checkCommand({
  msg: 'bar',
  type: 'display'
});
checkCommand(32);
checkCommand({});
