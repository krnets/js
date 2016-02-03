Array.dim = function (dimension, initial) {
    var a = [], i;
    for (i = 0; i < dimension; i += 1) {
        a[i] = initial;
    }
    return a;
};

var data = [4, 8, 15, 16, 23, 42];

var add = function (a, b) {
    return a + b;
};

var mult = function (a, b) {
    return a * b;
};

Array.reduce = function (f, value) {
   var i;
    for (i = 0; i < this.length; i += 1) {
        value = f(this[i], value);
    }
    return value;
};

var sum = data.reduce(add, 0);
console.log(sum);

var product = data.reduce(mult, 1);
console.log(product);

Array.matrix = function(m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i++) {
        a = [];
        for (j = 0; j < n; j++) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

var myMatrix = Array.matrix(4, 4, 0);
console.log(myMatrix);

Array.identity = function(n) {
    var i, mat = Array.matrix(n,n,0);
    for (i = 0; i < n; i++) {
        mat[i][i] = 1;
    }
    return mat;
};

myMatrix = Array.identity(5);
console.log(myMatrix[3][3]);

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.ora.com:80/goodparts?q#fragment";

var result = parse_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'port',
            'path', 'query', 'hash'];

var blanks = '        ';
var i;

for (i = 0; i < names.length; i++) {
    console.log(names[i] + ':' +
               blanks.substring(names[i].length), result[i]);
    
    
}