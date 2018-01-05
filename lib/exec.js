const CLIENT_PROVIDER = require('./connection/client');

module.exports = function exec(params) {
    // We test for protocol to avoid unexpected behaviour
    if (params.deviceType.protocol === 'mqtt') {
        // 'mode' means that we want to switch the mode of the device
        if (params.deviceType.type === 'mode') {
        }

        throw new Error(`Arduino - DeviceType type invalid or unknown: ${params.deviceType.type}`);
    }
    else {
        throw new Error('This service/module only performs mqtt requests!');
    }
};

function sendMqttMsg(value) {
    // Expected topic: site/building/zone/environment/device-type
    let target  = params.deviceType.identifier;           // site/building/zone/environment/...
    target     += params.deviceType.deviceTypeIdentifier; // ...device-type

    CLIENT_PROVIDER.getClient().publish(target, `${value}`);
}
