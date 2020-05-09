module.exports = {
    getSystemStatusService: function(params, res) {
        
        const reply = 
            [
                "Current temperature is -273K",
                "Current humidity is 93%",
                "Channel 1 is on",
                "Channel 2, 3, 4, 5 are off"
            ]
        
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