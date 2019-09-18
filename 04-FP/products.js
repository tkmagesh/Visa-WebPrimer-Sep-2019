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

function describeGroup(obj){
	for(var key in obj)
		describe('Key - [' + key + ']', function(){
			console.table(obj[key]);
		});
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

describe('Filter', function(){
	describe('default filter [ stationary products ]', function(){
		function filterStationaryProducts(){
			var result = [];
			for (var i = products.length - 1; i >= 0; i--) {
				if (products[i].category === 'stationary')
					result.push(products[i])
			}
			return result;
		}
		var stationaryProducts = filterStationaryProducts();
		console.table(stationaryProducts)
	});

	describe('any list by any criteria', function(){
		function filter(list, criteria){
			var result = [];
			for (var i = list.length - 1; i >= 0; i--) {
				if (criteria(list[i]))
					result.push(list[i])
			}
			return result;
		}

		function negate(criteria){
			return function(){
				return !criteria.apply(this, arguments);
			}
		}

		describe('products by cost', function(){
			
			var costlyProductCriteria = function(product){
				return product.cost > 60;
			};

			describe('cost products [cost > 60 ]', function(){
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});

			describe('affordable products [!costly product]', function(){
				/*var affordableProductCriteria = function(product){
					return !costlyProductCriteria(product);
				};*/

				var affordableProductCriteria = negate(costlyProductCriteria);

				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			});

		});

		describe('products by units', function(){
			var understockedProductCriteria = function(product){
				return product.units < 50;
			};
			describe('understocked products [units < 50]', function(){
				
				var understockedProducts = filter(products, understockedProductCriteria);
				console.table(understockedProducts);
			});
			describe('wellstocked products [!understocked product]', function(){
				/*var willstockedProductCriteria = function(product){
					return !understockedProductCriteria(product);
				};*/
				var willstockedProductCriteria = negate(understockedProductCriteria);
				var wellstockedProducts = filter(products, willstockedProductCriteria);
				console.table(wellstockedProducts);
			})
		});

	})
});

describe('GroupBy', function(){
	describe('Default groupBy [products by category]', function(){
		function groupProductsByCategory(){
			var result = {};
			for (var i = products.length - 1; i >= 0; i--) {
				var key = products[i].category;
				result[key] = result[key] || [];
				result[key].push(products[i]);
			}
			return result;
		}
		var productsByCategory = groupProductsByCategory();
		describeGroup(productsByCategory);
	});
	describe('any list by any key', function(){
		function groupBy(list, keySelector){
			var result = {};
			for (var i = list.length - 1; i >= 0; i--) {
				var key = keySelector(list[i]);
				result[key] = result[key] || [];
				result[key].push(list[i]);
			}
			return result;
		}

		describe('products by cost', function(){
			var costKeySelector = function(product){
				return product.cost <= 50 ? 'affrodable' : 'costly';
			};
			var productsByCost = groupBy(products, costKeySelector);
			describeGroup(productsByCost);
		})
	})
});
