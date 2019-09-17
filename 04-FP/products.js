var products = [
	{id : 5, name : 'Pen', cost : 60, units : 40, category : 'stationary'},
	{id : 9, name : 'Len', cost : 40, units : 30, category : 'grocery'},
	{id : 7, name : 'Ten', cost : 80, units : 80, category : 'grocery'},
	{id : 3, name : 'Den', cost : 50, units : 70, category : 'stationary'},
	{id : 6, name : 'Zen', cost : 60, units : 50, category : 'stationary'},
];

//sort, filter, groupBy

function describe(title, fn){
	console.group(title)
	fn();
	console.groupEnd();	
}

describe('Default List', function(){
	console.table(products);
});


describe('Sorting', function(){
	describe('Default Sort [ products by id ]', function(){
		function sortProductById(){
			/*....*/
		}
		sortProductById();
		console.table(products);
	});

	describe('Any list by any attribute', function(){

		function sort(){

		}
		describe('products by cost', function(){
			sort();
			console.table(products);
		});

		describe('products by units', function(){
			sort();
			console.table(products);
		});
	});
});

/*describe('Filter', function(){
	describe('default filter [ stationary products ]', function(){
		//filterStationaryProducts();
		console.table(products)
	});
});*/