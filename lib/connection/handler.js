const EXPLICIT_STATES = ['off', 'on', 'auto'];
const IDENTIFIERS_REG_EXP = /^(.+\/)(.+)\/state$/;

module.exports = function (topic, message) {
    if(IDENTIFIERS_REG_EXP.test(topic)) {
        try {
            sails.log.info(`MQTT: New state received in topic ${topic}: ${EXPLICIT_STATES[message]}`);

            // 0: All, 1: Device; 2: DeviceType
            const IDENTIFIERS = IDENTIFIERS_REG_EXP.exec(topic);

            gladys.device.getByIdentifier({identifier: IDENTIFIERS[1], service: 'mqtt-arduino'})
                .then(function (device) {
                    gladys.deviceType.getByIdentifier({
                        deviceIdentifier: device.identifier,
                        deviceService: device.service,
                        deviceTypeIdentifier: IDENTIFIERS[2]
                    }).then(function (deviceType) {
                        return gladys.deviceState.createByIdentifier(
                            device.identifier,
                            device.service,
                            deviceType.type,
                            {
                                value: message,
                                datetime: new Date()
                            });
                    });
                });
        } catch(error) {
            sails.log.error(error);
        }

    }
    else {
        return Promise.resolve();
    }
};