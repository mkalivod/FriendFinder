var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
//take the PORT defined by the deployment site or 8080
var PORT = process.env.PORT || 8080;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
//for app.js file to be used in survey.html
app.use(express.static(path.join(__dirname, '/public')));

//require apiRoutes.js and htmlRoutes.js from the routing folder
require('./routing/apiRoutes.js')(app);
require('./routing/htmlRoutes.js')(app);

//listen on PORT defined by the deployment site or 8080
app.listen(PORT, function(){
	console.log("listening on port: " + PORT);
});