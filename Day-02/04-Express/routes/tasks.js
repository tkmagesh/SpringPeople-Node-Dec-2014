var express = require('express');
var router = express.Router();
var _ = require('lodash');

var taskList = [
	{id : 1, name : "Learn JavaScript Better", isCompleted : false},
	{id : 2, name : "Master Node.js", isCompleted : false},
	{id : 3, name : "Explore Angular.js", isCompleted : true},
];

/* GET users listing. */
router.get('/', function(req, res) {
  
  res.render('tasks/index', {list : taskList});
});

router.get('/new', function(req,res){
	res.render('tasks/new');
});

router.post('/new', function(req,res){
	var taskName = req.body.taskName;
	var newId = _.max(taskList, function(t){ return t.id}).id + 1;
	var newTask = {
		id : newId,
		name : taskName,
		isCompleted : false
	};
	taskList.push(newTask);
	res.redirect('/tasks');
})

module.exports = router;