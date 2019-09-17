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
			for(var i=0; i < products.length-1; i++){
				for(var j=i+1; j < products.length; j++){
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
				}
			}
		}
		sortProductById();
		console.table(products);
	});

	describe('Any list by any attribute', function(){

		function sort(list, attrName){
			for(var i=0; i < list.length-1; i++){
				for(var j=i+1; j < list.length; j++){
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
			}
		}
		describe('products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});

		describe('products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
	});

	describe('Any list by any comparer', function(){
		function sort(list, comparerFn){
			for(var i=0; i < list.length-1; i++){
				for(var j=i+1; j < list.length; j++){
					if (comparerFn(list[i], list[j]) > 0 ){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
			}
		}

		describe('products by value [cost * units]', function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;

				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0
			};

			sort(products, productComparerByValue);

			console.table(products);
		})
	})
});

/*describe('Filter', function(){
	describe('default filter [ stationary products ]', function(){
		//filterStationaryProducts();
		console.table(products)
	});
});*/