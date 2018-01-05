module.exports = function (sails) {
    const EXEC    = require('./lib/exec.js');
    const CONNECT = require('./lib/connection/connect.js');

    // Called when Gladys wakes up :)
    gladys.on('ready', function () {
        CONNECT();
    });

    // Called when a user changes a device's state
    return {
        EXEC
    };
};