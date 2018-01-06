module.exports = function () {
    const connect = require('./lib/connection/connect.js');
    const exec    = require('./lib/exec.js');

    // Called when Gladys wakes up :)
    gladys.on('ready', function () {
        connect();
    });

    // Called when a user changes a device's state
    return {
        exec
    };
};