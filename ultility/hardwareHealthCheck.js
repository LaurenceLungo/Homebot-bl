const axios = require('axios');
const datastore = require('./datastore');

module.exports = {
    hardwareHealthCheck: async function() {
        
        async function isHardwareConnected() {
            return axios.get('https://api.yocto.hk/blynk/' + await datastore.getSecret('BLYNK_AUTH_TOKEN') + '/isHardwareConnected')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
        }

        return isHardwareConnected().then(status => {
            console.log("<> Homebot-hw connected:", status);
            const reply = "Sorry, Homebot is currently disconnected :(";

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
            
            const fallbackMessage = {
                payload: speechResponse,
                fulfillmentText: reply,
                speech: reply,
                displayText: reply,
                source: "Homebot-bl"
            };

            return [status, fallbackMessage];
        })
    }
}
