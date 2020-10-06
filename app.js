var express=require("./node_modules/express"); 
var bodyParser=require("./node_modules/body-parser"); 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/Form'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 


app.use(bodyParser.json()); 
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/sign_up', function(req,res){ 
	var name = req.body.name; 
	var email =req.body.email; 
	var pass = req.body.password; 
	var phone =req.body.phone; 

	var data = { 
		"name": name, 
		"email":email, 
		"password":pass, 
		"phone":phone 
	} 
db.collection('info').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return res.redirect('signup_success.html'); 
}) 

app.post('/login_up',function(req,res){
	var name = req.body.name; 
	
	var pass = req.body.password; 
	

	var data = { 
		"name": name, 
		"password":pass, 
	} 
	db.collection('info').findOne(data,function(err, collection){ 
		if (err) res.redirect('not.html');
		else{
		res.redirect('LoginS.html')}
			
	}); 	
	
});
app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
	}); 
return res.redirect('index.html'); 
}).listen(3000) 


console.log("server listening at port 3000"); 
