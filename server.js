"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/dialog", function(req, res) {

    console.log(req.body);

    const speech = "I don't know";
  
    var speechResponse = {
        google: {
        expectUserResponse: true,
        richResponse: {
            items: [
            {
                simpleResponse: {
                textToSpeech: speech
                }
            }
            ]
        }
        }
  };
  
  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "Homebot-bl"
  });
});

let port = process.env.PORT || 8000;
restService.listen(port, function() {
  console.log("Homebot-bl listening port", port);
});