Constructor Function

invoked with 'new' keyword

	this -> new object
	this -> returned by default


function Spinner(){
	
	//this -> new object
	var counter = 0;

	this.up = function(){
		return ++counter;
	};

	this.down = function(){
		return --counter;
	}

	//this -> returned by default
}

function Spinner(){
	this.__counter__ = 0;
}
Spinner.prototype.up = function(){
	return ++this.__counter__;
};

Spinner.prototype.down = function(){
	return --this.__counter__;
}