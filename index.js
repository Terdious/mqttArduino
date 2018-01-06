module.exports = function (sails) {
    const CONNECT = require('./lib/connection/connect.js');
    let   exec    = require('./lib/exec.js');

    // Called when Gladys wakes up :)
    gladys.on('ready', function () {
        CONNECT();
    });

    // Called when a user changes a device's state
    return {
        exec
    };
};