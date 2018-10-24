const clientProvider = require('./connection/client');

module.exports = function exec(params) {
    
sails.log.info(`Arduino - Successfully connected to MQTT: OK10`);
    
    // We test for protocol to avoid unexpected behaviour
    if (params.deviceType.protocol === 'mqtt') {
        // 'mode' means that we want to switch the mode of the device
        if (params.deviceType.type === 'mode') {
            sendMqttMsg(params.deviceType, params.value);
        }
        else {
            throw new Error(`Arduino - DeviceType type invalid or unknown: ${params.deviceType.type}`);
        }
    }
    else {
        throw new Error('This service/module only performs mqtt requests!');
    }
sails.log.info(`Arduino - Successfully connected to MQTT: ${params.deviceType.type}`);
sails.log.info(`Arduino - Successfully connected to MQTT: ${params.deviceState.LastValue}`);
sails.log.info(`Arduino - Successfully connected to MQTT: ${params.deviceType.deviceTypeValue}`);

sails.log.info(`Arduino - Successfully connected to MQTT: ${params.deviceType.device}`);
sails.log.info(`Arduino - Successfully connected to MQTT: ${params.deviceType.LastValue}`);
sails.log.info(`Arduino - Successfully connected to MQTT: ${params.deviceState}`);
};

function sendMqttMsg(deviceType, value) {
    // Expected topic: site/building/zone/environment/device-type
    let target  = deviceType.identifier;           // site/building/zone/environment/...
    target     += deviceType.deviceTypeIdentifier; // ...device-type

    clientProvider.getClient().
        then(
            function (client) {
                client.publish(target, `${value}`); // It doesn't like when values are numbers
sails.log.info(`Arduino - Successfully connected to MQTT: ${target} = ${value}`);
            }
        );

}
