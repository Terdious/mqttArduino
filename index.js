let test ="" 

module.exports = function () {
    const connect = require('./lib/connection/connect.js');
    const exec    = require('./lib/exec.js');

    // Called when Gladys wakes up :)
    gladys.on('ready', function () {
sails.log.info(`Arduino - Successfully connected to MQTT: OK11`);
        connect();
sails.log.info(`Arduino - Successfully connected to MQTT: OK12`);
    });

    // Called when a user changes a device's state
    return {
sails.log.info(`Arduino - Successfully connected to MQTT: OK13`);
        exec
sails.log.info(`Arduino - Successfully connected to MQTT: OK14`);
    };
};
