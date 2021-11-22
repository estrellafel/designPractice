// console.log(eligibility( 35, 'CA', true, 3));
// console.log(eligibility( 61, 'wi', true, 3));
// console.log(eligibility( 38, 'WI', false ));

// console.log(oddlyEven( 18 ));
// console.log(oddlyEven( -3 ));
// console.log(oddlyEven( 183 ));
// console.log(oddlyEven( '#:*****:##' ));
// console.log(oddlyEven( 'CS' ));
// console.log(oddlyEven( oddlyEven(318) ));

// console.log(allAnagrams("naps pans span"));
// console.log(allAnagrams(""));
// console.log(allAnagrams("part tarp rappt"));
// console.log(allAnagrams("span span"));
// console.log(allAnagrams("spear pears parse pares reaps"));

// var testing = [{ a:3, b:'Cat', c:true }, 13, { a:12, b:'Hat', c:false }, { cat:3, hat:'3', rat:false } ];
// console.log(props( testing, 'b' ));
// console.log(props( testing, 'a' ));
// console.log(props( testing, 'cat' ));

// console.log(grouper( [1,2,3,4,5], 2 ));
// console.log(grouper( ['a','b','c','d','e'], 4 ));
// console.log(grouper( [], 3 ));


// console.log(repeat( "cow", 3 ));
// console.log(repeat( "alf", 10 ));
// console.log(repeat( "repeat", -3 ));


// console.log(repeatf( () => { return "cow"; } , 3 ));
// console.log(repeatf(function() { return 3; }, 2 ));
// console.log(repeatf(Math.random, 3 ));

// console.log(breakup( [ 1, 2, 3, 5, 6, 7 ], (x) => { return x % 2 == 0; } ));
// console.log(breakup( [ 1.3, 5.1, 1.1, 4.3, 5.5 ], Math.floor ));
// console.log(breakup( ['cat', 'bat', 'rat', 'horse', 'pony'], function(s) { return s.length; } ));

// console.log(none( [ 0, 1, 2, 3 ], (x) => x > 1 ));
// console.log(none( [ 1, 2, 3, 4 ], (x) => x < 0 ));
// console.log(none( [ 'a', [], 3, false, null ], (x) => typeof x == 'function' ));

// var objects = [ { public : true, name : "Lion King" }, { public : true, name : 'Dumbo' }, { public : false, name : 'Lion King' }, { name : 'Xeon', rating : 5 } ];
// console.log(noSql( objects, { public:true } ));
// console.log(noSql( objects, { name:'Lion King' } ));
// console.log(noSql( objects, { rating:5 } ));
// console.log(noSql( objects, { public:false, name:'Dumbo' } ));

// var a = myChoice( [1, "a", 3, false] );
// console.log(a( 3, 12 ));
// console.log(a( 51, -2));
// console.log(a( "happy", false ));
// console.log(a( [1,2,3]));
// console.log(a( 'rechoose') );
// console.log(a( a, a ));

// var x = sequence( 3, 15 );
// console.log([ x(), x(), x() ]);
// var y = sequence( 28, -5 );
// console.log([ y(), y(), y() ]);

// var m = matchmaker( { a : 'b', c : 3 } );
// console.log(m( { a : 'b', c : 3, d : true } ));
// console.log(m( { a : 'b', c : 4, d : true } ));
// console.log(m( 328 ));
