
module.exports.getSpinner = function () {
	var count = 0;
	return {
		up : function(){ return ++count;},
		down : function(){ return --count}
	};
}