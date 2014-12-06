var handlers = [];
module.exports = {
	add : function(handler){
		handlers.push(handler);
	},
	start : function(){
		return function(req,res){
			function run(req,res, fns){
			   var fnToExecuteNow = fns[0];
			   if (fnToExecuteNow){
			      var remaining = fns.slice(1)
			      var next = function(){
			         run(req,res,remaining);
			      };
			      fnToExecuteNow(req,res,next);
			   }
			};
			run(req,res,handlers);
		}
	}
}