require('dotenv').config();
const axios = require('axios');

module.exports = {
    getHumidityService: function(params, res) {

        function getHumidityValue() {
            return axios.get('http://blynk-cloud.com/' + process.env.BLYNK_AUTH_TOKEN + '/get/V9')
            .then(response => {
                return response.data[0];
            })
            .catch(error => {
                console.log(error);
            });
        }

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
    }
}