const SHARED = require('../shared');

module.exports = function (topic, message) {
    message = JSON.parse(message);

    gladys.param.getValue(SHARED.mqttStateTopicPrefixParam).then(function (mqttStateTopicPrefix) {
        const MY_TOPIC_OFFSET = mqttStateTopicPrefix.length ? mqttStateTopicPrefix.length + 1 : 0;

        gladys.device.getByIdentifier({
            identifier: topic.substring(MY_TOPIC_OFFSET),
            service: SHARED.serviceName
        }).then(function (device) {
            return gladys.deviceType.getByDevice(device);
        }).then(function (deviceTypes) {
            deviceTypes.forEach(function (deviceType) {
                if (message[deviceType.identifier] === undefined) { return; }

                gladys.deviceState.create({devicetype: deviceType.id, value: message[deviceType.identifier]});
            });
        });
    });
};