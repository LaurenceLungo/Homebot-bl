"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
const getTempService = require("./intentService/getTemp").getTempService;
const getHumidityService = require("./intentService/getHumidity").getHumidityService;
const getSystemStatusService = require("./intentService/getSystemStatus").getSystemStatusService;
const turnOnService = require("./intentService/turnOn").turnOnService;
const turnOffService = require("./intentService/turnOff").turnOffService;

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.get("/", function(req, res) {
    res.send("Homebot-business-logic V1.0 is healthy");
})

restService.post("/dialog", function(req, res) {

  const intent = req.body.queryResult.intent.displayName || '';
  const params = req.body.queryResult.parameters || {};

  console.log("<> req: ", JSON.stringify(req.body));
  console.log("<> intent: ", JSON.stringify(intent));
  console.log("<> params: ", JSON.stringify(params));

  switch (intent) {
      case 'get_temp':
          return getTempService(params, res);
      case 'get_humidity':
          return getHumidityService(params, res);
      case 'get_system_status':
          return getSystemStatusService(params, res);
      case 'turn_on':
          return turnOnService(params, res);
      case 'turn_off':
          return turnOffService(params, res);
  }

  // fallback
  const fallback = "Something's wrong, I can feel it";
  var speechResponse = {
      google: {
      expectUserResponse: false,
      richResponse: {
          items: [
          {
              simpleResponse: {
              textToSpeech: fallback
              }
          }
          ]
      }
      }
  };
  
  return res.json({
    payload: speechResponse,
    fulfillmentText: fallback,
    speech: fallback,
    displayText: fallback,
    source: "Homebot-bl"
  });
});

let port = process.env.PORT || 8000;
restService.listen(port, function() {
  console.log("<> Homebot-bl listening port", port);
});
