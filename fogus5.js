var _ = require('underscore');

function dispatch(/* funs */ ) {
  var funs = _.toArray(arguments);
  var size = funs.length;

  return function(target /* args */ ) {
    var ret = undefined;
    var args = _.rest(arguments);

    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, construct(target, args));

      if (existy(ret)) return ret;
    }

    return ret;
  }
}

var str = dispatch(invoker('toString', Array.prototype.toString),
  invoker('toString', String.prototype.toString));

str('a');
str(_.range(10));

function stringReverse(s) {
  if (!_.isString(s)) return undefined;
  return s.split('').reverse().join('');
}

stringReverse('abc');
stringReverse(1);

var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);

rev([1, 2, 3]);
rev('abc');

var sillyReverse = dispatch(rev, always(42));

sillyReverse([1, 2, 3]);
sillyReverse('abc');
sillyReverse(100000);

function performCommandHardcoded(command) {
  var result;

  switch (command.type) {
    case 'notify':
      result = notify(command.message);
      break;
    case 'join':
      result = changeView(command.target);
      break;
    default:
      alert(command.type);
  }
  return result;
}

// performCommandHardcoded({
//  type: 'notify',
//  message: 'hi!'
// })

// performCommandHardcoded({type: 'join', target: 'waiting-room'})

performCommandHardcoded({
  type: 'wat'
});

function isa(type, action) {
  return function(obj) {
    if (type === obj.type)
      return action(obj);
  }
}

var performCommand = dispatch(
  isa('notify', function(obj) {
    return notify(obj.message);
  }),
  isa('join', function(obj) {
    return changeView(obj.target);
  }),
  function(obj) {
    alert(obj.type);
  }
);

var performAdminCommand = dispatch(
  isa('kill', function(obj) {
    return shutdown(obj.hostname);
  }),
  performCommand);

// performAdminCommand({type: 'kill', hostname: 'evo'})
performAdminCommand({
  type: 'flail'
});

// performAdminCommand({ type: 'join', target: 'foo'})

var performTrialUserCommand = dispatch(
  isa('join', function(obj) {
    alert('Cannot join until approved');
  }),
  performCommand);

performTrialUserCommand({
  type: 'join',
  target: 'foo'
});

performTrialUserCommand({
  type: 'notify',
  message: 'Hi new user'
});


// Currying section

function rightAwayInvoker() {
  var args = _.toArray(arguments);
  var method = args.shift();
  var target = args.shift();

  return method.apply(target, args);
}

rightAwayInvoker(Array.prototype.reverse, [1, 2, 3]);
invoker('reverse', Array.prototype.reverse)([1, 2, 3]);

function leftCurryDiv(n) {
  return function(d) {
    return n / d;
  }
}

function rightCurryDiv(d) {
  return function(n) {
    return n / d;
  }
}

var divide10By = leftCurryDiv(10);

divide10By(2);

var divideBy10 = rightCurryDiv(10);

divideBy10(2);

function curry(fun) {
  return function(arg) {
    return fun(arg);
  }
}

parseInt('11');
parseInt('11', 2);

_.map(['11', '11', '11', '11'], parseInt);
_.map(['11', '11', '11', '11'], curry(parseInt));

function curry2(fun) {
  return function(secondArg) {
    return function(firstArg) {
      return fun(firstArg, secondArg);
    }
  }
}

function div(n, d) {
  return n / d;
}

var div10 = curry2(div)(10);

div10(50);

var parseBinaryString = curry2(parseInt)(2);

parseBinaryString('111');
parseBinaryString('10');

var
  plays = [{
    artist: 'Burial',
    track: 'Archangel'
  }, {
    artist: 'Ben Frost',
    track: 'Stomp'
  }, {
    artist: 'Ben Frost',
    track: 'Stomp'
  }, {
    artist: 'Burial',
    track: 'Archangel'
  }, {
    artist: 'Emeralds',
    track: 'Snores'
  }, {
    artist: 'Burial',
    track: 'Archangel'
  }];

_.countBy(plays, function(song) {
  return [song.artist, song.track].join(' - ');
});

function songToString(song) {
  return [song.artist, song.track].join(' - ');
}

var songCount = curry2(_.countBy)(songToString);

songCount(plays);

function curry3(fun) {
  return function(last) {
    return function(middle) {
      return function(first) {
        return fun(first, middle, last);
      }
    }
  }
}

var songsPlayed = curry3(_.uniq)(false)(songToString);

songsPlayed(plays);

_.uniq(plays, false, songToString);

function toHex(n) {
  var hex = n.toString(16);
  return (hex.length < 2) ? [0, hex].join('') : hex;
}

function rgbToHexString(r, g, b) {
  return ['#', toHex(r), toHex(g), toHex(b)].join('');
}

rgbToHexString(255, 255, 255);

var blueGreenish = curry3(rgbToHexString)(255)(200);

blueGreenish(0);

var greaterThan = curry2(function(lhs, rhs) {
  return lhs > rhs;
});

var lessThan = curry2(function(lhs, rhs) {
  return lhs < rhs;
});

var withinRange = checker(
  validator('arg must be greater than 10', greaterThan(10)),
  validator('arg must be less than 20', lessThan(20))
);

withinRange(15);
withinRange(1);
withinRange(100);

function divPart(n) {
  return function(d) {
    return n / d;
  }
}

var over10Part = divPart(10);
over10Part(2);

function partial1(fun, arg1) {
  return function(/* args */ ) {
    var args = construct(arg1, arguments);
    return fun.apply(fun, args);
  }
}

var over10Part1 = partial1(div, 10);

over10Part1(5);

function partial2(fun, arg1, arg2) {
  return function(/* args */ ) {
    var args = cat([arg1, arg2], arguments);
    return fun.apply(fun, args);
  }
}

var divide10By2 = partial2(div, 10, 2);
divide10By2();

function partial(fun /*, pargs */ ) {
  var pargs = _.rest(arguments);

  return function(/* argumetns */ ) {
    var args = cat(pargs, _.toArray(arguments));
    return fun.apply(fun, args);
  }
}

var over10Partial = partial(div, 10);
over10Partial(2);

var div10By2By4By500Partial = partial(div, 10, 2, 4, 500);
div10By2By4By500Partial();

validator('arg must be a map', aMap)(42);

var zero = validator('cannot be zero', function(n) {
  return 0 === n;
});

var number = validator('arg must be a number', _.isNumber);

function sqr(n) {
  if (!number(n)) throw new Error(number.message);
  if (zero(n)) throw new Error(zero.message);

  return n * n;
}

sqr(10);
  // sqr(0)
  // sqr('')

function condition1(/* validators */ ) {
  var validators = _.toArray(arguments);

  return function(fun, arg) {
    var errors = mapcat(function(isValid) {
      return isValid(arg) ? [] : [isValid.message];
    }, validators);

    if (!_.isEmpty(errors))
      throw new Error(errors.join(', '));

    return fun(arg);
  }
}

var sqrPre = condition1(
  validator('arg must not be zero', complement(zero)),
  validator('arg must be a number', _.isNumber)
);

sqrPre(_.identity, 10);
  // sqrPre(_.identity, '')
  // sqrPre(_.identity, 0)

function uncheckedSqr(n) {
  return n * n;
}

var validateCommand = condition1(
  validator('arg must be a map', _.isObject),
  validator('arg must have the correct keys', hasKeys('msg', 'type'))
);
uncheckedSqr('');

var checkedSqr = partial1(sqrPre, uncheckedSqr);
checkedSqr(10);
  // checkedSqr(0)
  // checkedSqr('')

var createCommand = partial(validateCommand, _.identity);

createCommand({});
createCommand(21);
createCommand({
  msg: '',
  type: ''
});

var createLaunchCommand = partial(
  condition1(
    validator('arg must have the count down', hasKeys('countDown'))),
  createCommand
);

createCommand({
  msg: '',
  type: ''
});
createCommand({
  msg: '',
  type: '',
  countDown: 10
});

function isntString(str) {
  return !_.isString(str);
}

isntString(1);

var isntString2 = _.compose(function(x) {
  return !x;
}, _.isString);

isntString2([]);

function not(x) {
  return !x;
}

var isntString3 = _.compose(not, _.isString);

var composeMapcat = _.compose(splat(cat), _.map);

composeMapcat([
  [1, 2],
  [3, 4],
  [5]
], _.identity);

var sqrPost =
  condition1(
    validator(
      'result should be a number',
      _
      .isNumber
    ),
    validator(
      'result should not be zero',
      complement(
        zero
      )),
    validator(
      'result should be positive',
      greaterThan(
        0
      )));

sqrPost(_.identity, 0);
sqrPost(_.identity, -1);
sqrPost(_.identity, '');
sqrPre(_.identity, 100);

var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);

megaCheckedSqr(10);
megaCheckedSqr(0);
megaCheckedSqr(NaN);
