module.exports = function(sails){
	var connect = 
require('./lib/connect.js');
	gladys.on('ready', function(){
		connect();
	});
	return {
	};
};
