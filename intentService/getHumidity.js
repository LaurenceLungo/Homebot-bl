module.exports = {
    getHumidityService: function(params, res) {
        
        const reply = "Current humidity is 93%";
        
        var speechResponse = {
            google: {
            expectUserResponse: false,
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
    }
}