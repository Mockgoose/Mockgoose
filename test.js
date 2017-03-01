var mongoose = require('mongoose');
let {Mockgoose} = require('./built/mockgoose');

let mockgoose = new Mockgoose(mongoose);
mockgoose.prepareStorage().then(() => {
	console.log('prepare storage ok', mongoose.mocked);
	mongoose.connect('mongodb://sdfsdfsdf:27017');
	
	mongoose.connection.on('connected', function () {  
	  console.log('Mongoose open');
	}); 
});
//var Mockgoose = require('./Mockgoose')(mongoose).then(function() {
	

//});
