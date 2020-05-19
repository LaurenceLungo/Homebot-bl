const datastore = require('../ultility/datastore');
const axios = require('axios');
const hardwareHealthCheck = require("../ultility/hardwareHealthCheck").hardwareHealthCheck;

module.exports = {
    getHumidityService: async function(params, res) {

        async function getHumidityValue() {
            return axios.get('https://api.yocto.hk/blynk/' + await datastore.getSecret('BLYNK_AUTH_TOKEN') + '/get/V9')
            .then(response => {
                return response.data[0];
            })
            .catch(error => {
                console.log(error);
            });
        }

        const [ isHardwareConnected, hardwareDisconnectedMessage ] = await hardwareHealthCheck();

        if (isHardwareConnected) {
            getHumidityValue().then(humidity => {
                const reply = "Current humidity is " + parseFloat(humidity).toFixed() + "%";
                console.log(reply);
                
                var speechResponse = {
                    google: {
                    expectUserResponse: true,
                    richResponse: {
                        items: [
                        {
                            simpleResponse: {
                            textToSpeech: reply
                            }
                        }
                        ]
                    }
                    }
                };
            
                return res.json({
                    payload: speechResponse,
                    fulfillmentText: reply,
                    speech: reply,
                    displayText: reply,
                    source: "Homebot-bl"
                });
            })
        } else {
            return res.json(hardwareDisconnectedMessage);
        }
    }
}