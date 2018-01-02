var client = null;
var Promise = require('bluebird');
var connect = require('./connect.js');
module.exports = {
	getClient: function(){
		if(client === null) {
			return connect();
		}
						return Promise.resolve(client);
	},
	setClient: function(newClient){
		client = newClient;
	}
};
