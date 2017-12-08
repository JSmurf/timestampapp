var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express()
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
res.sendfile('default.html', { root: __dirname})
})

app.get('/dateValue/:dateVal', function(req, res) {
var dateVal = req.params.dateVal;
var unixDate;
var naturalDate;
var dateFormatter = {
	'year': 'numeric',
	'month' : 'long',
	'day' :'numeric'
}

if (isNaN(dateVal)) {
	naturalDate = new Date(dateVal);
	naturalDate = naturalDate.toLocaleDateString('en-us', dateFormatter);
	unixDate = new Date(dateVal).getTime() / 1000;
} else {
	console.log(dateVal)
	unixDate = dateVal;
	naturalDate =   new Date(dateVal * 1000);
	naturalDate = naturalDate.toLocaleDateString('en-us', dateFormatter);
}

	res.json({'unix' : unixDate, "natural" : naturalDate});
})

app.listen(3000, function() {
	console.log('All is well');
});