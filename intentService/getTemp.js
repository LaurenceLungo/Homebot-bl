const axios = require('axios');
const datastore = require('../ultility/datastore');
const hardwareHealthCheck = require("../ultility/hardwareHealthCheck").hardwareHealthCheck;

module.exports = {
    getTempService: async function(params, res) {
        
        async function getTempValue() {
            return axios.get('https://api.yocto.hk/blynk/' + await datastore.getSecret('BLYNK_AUTH_TOKEN') + '/get/V8')
            .then(response => {
                return response.data[0];
            })
            .catch(error => {
                console.log(error);
            });
        }

        const [ isHardwareConnected, hardwareDisconnectedMessage ] = await hardwareHealthCheck();

        if (isHardwareConnected) {
            getTempValue().then(temp => {
                const reply = "Current temperature is " + parseFloat(temp).toFixed(1) + " degree celsius";
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
