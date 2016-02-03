var _ = require('underscore');

function splat(fun) {
    return function(array) {
        return fun.apply(null, array);
    };
}

var addArrayElements = splat(function(x, y) {
    return x + y
});

addArrayElements([1, 2]);

function unsplat(fun) {
    return function() {
        return fun.call(null, _.toArray(arguments));
    };
}

var joinElements = unsplat(function(array) {
    return array.join(' ')
});

joinElements('a', 'b');

function parseAge(age) {
    if (!_.isString(age)) fail("Expecting a string");
    var a;

    note("Attempting to parse an age");
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

parseAge("42");

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
    if (!_.isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1))
        fail("Index value is out of bounds");

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
