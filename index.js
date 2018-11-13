/* ENTRY POINT OF THE GLADYS MODULE */

const initMqttConnection = require('./lib/connection/initMqttConnection');
const exec               = require('./lib/exec');

module.exports = function () {
    // The "ready" event is fired when Gladys has loaded up
    gladys.on('ready', function () {
        initMqttConnection();
    });

    return {
        exec // Called when someone performs an action in the devices control panel
    };
};