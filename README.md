*Don't forget to **install `node_modules`**!*

The sources of the modules must be placed in a folder called `mqtt-controller` in the `api/hooks` folder of Gladys.

# Gladys Parameters
In order to connect to your MQTT broker this module uses three (3) Gladys parameters:
* `MQTT_URL`: the address of your MQTT broker, including the protocol used (`mqtt` or `mqtts`) and its port (`1883` by default);
* `MQTT_USERNAME`: the username required to connect to your MQTT broker;
* `MQTT_PASSWORD`: the password required to connect to your MQTT broker;
* `MQTT_COMMAND_TOPIC_PREFIX`: the prefix that will be prepend to MQTT topics where Gladys publishes;
* `MQTT_STATE_TOPIC_PREFIX`: the prefix that will be prepend to MQTT topics subscribed by Gladys.

# How to configure your Gladys Devices?
Basically you can configure them the way you want them to be configured. However there are a few rules to follow for the module to work:
* The `protocol` setting of your device must be set to either `mqtt` or `mqtts` so an action in the `Control my devices` section of Gladys can be caught by the module, otherwise it will be ignored;
* The `service` setting of your device must be set to `mqtt-controller` for the same reason;
* One `DeviceType` represents one property of your device (more information below);
* You can set the other settings as you wish.

# How are messages sent to devices?
Once your devices are configured, you can send them messages via the `Control my devices` section of the `Device` control panel of Gladys.

Basically, the module constructs the channel's "address" by concatenating the `MQTT_COMMAND_TOPIC_PREFIX` parameter's value with the `Device`'s `Identifier` and sends a JSON string containing one key-value pair determined by the `DeviceType`'s `Identifier` and the `value` you've set your `DeviceType` to.

## Example
My `MQTT_COMMAND_TOPIC_PREFIX` parameter's value is set to `"gladys/cmd"`.

I have one `Device` configured as following:

Name | Identifier | Protocol | Service
-----|------------|----------|--------
LED strip | home/livingroom/ledstrip1 | mqtt | mqtt-controller

*The other settings are free to be anything you want them to be.*

This device contains two `DeviceType`s set as following:

Name | Identifier  | Min | Max | Display
-----|-------------|-----|-----|--------
LED strip - Pattern|pattern|0|9|True
LED strip - Brightness|brightness|0|100|True

*These two `DeviceType`s represent two parameters used by a unique LED strip.*

Now let's pretend I would like to set the brightness of my LED strip to 80%; I set the slider to `80` in the row called `LED strip - Brightness`.
Automatically, a MQTT message is sent to `gladys/cmd/home/livingroom/ledstrip1` containing the string `{"brightness": 80}`. Of course, your device must be subscribed to this topic.