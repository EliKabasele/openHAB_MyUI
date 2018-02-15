var smarthome = smarthome || {};

(function() {
'use strict';

// The URI of the AsTeRICS Runtime Environment's REST interface
let areURI = "http://localhost:8085/rest/";

// Define the smarthome AAIM
let aaim = {
  initial: "Services",
  states: [
    {
      name: "Services",
      do: {
        situation: "SelectService",
        parameters: {
          name: "getInstalledApps",
          parameters: []
        }
      },
      events: [
        { on: "SelectService('light')", goto: "Lamps" },
        { on: "SelectService('models')", goto: "Models" },
        { on: "SelectService('outlets')", goto: "Outlets" }
      ]
    },
    {
      name: "Lamps",
      do: {
        situation: "SelectOneOfMany",
        parameters: {
          service: "urc4esh", // service name changed: urc --> urc4esh
          name: "queryThings", // methode name changed: queryTargets --> queryThings
          parameters: [
            //URI changed 
            "http://localhost:8080/rest/things/hue:0210:001788285fd9:10"
          ],
          mapping: {
            name: "mapTargetsToMenu"
          }
        }
      },
      events: [
        { on: "SelectOneOfMany", goto: "Adjust" },
        { on: "MetaGoto('back')", goto: "Services" }
      ]
    },
    {
      name: "Adjust",
      do: {
        situation: "AdjustLight",
        parameters: {
          service: "urc4esh", // service name changed: urc --> urc4esh
          name: "currentState",
          parameters: [
            "${SelectOneOfMany.thingLabel}", // parameter socketName changed: --> thingLabel
            "${SelectOneOfMany.channelLabel}" // parameter targetID changed: --> channelLabel
          ],
          mapping: {
            name: "mapUrcHSBtoColor"
          }
        }
      },
      events: [
        {
          on: "AdjustLight", 
          goto: "Adjust", 
          do: {
            service: "urc4esh",// service name changed: urc --> urc4esh
            name: "setState",
            parameters: [
              "${SelectOneOfMany.thingLabel}", // parameter socketName changed: --> thingLabel
              "${SelectOneOfMany.channelLabel}", // parameter targetID changed: --> channelLabel
              "${AdjustLight}"
            ],
            parameterMapping: [
              undefined,
              undefined,
              { name: "mapColorToUrcHSB" }
            ]
          }
        },
        { on: "MetaGoto('back')", goto: "Lamps" }
      ]
    },
    {
      name: "Models",
      do: {
        situation: "SelectOneOfMany",
        parameters: {
          name: "getCurrentUsersModels",
          parameters: []
        },
      },
      events: [
        { 
          on: "SelectOneOfMany", 
          goto: "Models",
          do: {
            service: "asterics",
            name: "startModel",
            parameters: [
              "${SelectOneOfMany.modelPath}"
            ]
          }
        },
        { on: "MetaGoto('back')", goto: "Services" }
      ]
    },
    {
      name: "Outlets",
      do: {
        situation: "SelectOneOfMany",
        parameters: {
          service: "urc4esh", // service name changed: urc --> urc4esh
          name: "queryThings", // methode name changed: queryTargets --> queryThings
          parameters: [
            "http://hdm-stuttgart.de/WoehlkeWebsteckdose/WoehlkeWebsteckdoseSocket"
          ],
          mapping: {
            name: "mapTargetsToMenu"
          }
        }
      },
      events: [
        { on: "SelectOneOfMany", goto: "Switch" },
        { on: "MetaGoto('back')", goto: "Services" }
      ]
    },
    {
      name: "Switch",
      do: {
        situation: "SwitchOutlets",
        parameters: {
          service: "urc4esh", // service name changed: urc --> urc4esh
          name: "currentState",
          parameters: [
            "${SelectOneOfMany.thingLabel}", // parameter socketName changed: --> thingLabel
            "${SelectOneOfMany.channelLabel}" // parameter targetID changed: --> channelLabel
          ],
          mapping: {
            name: "mapUrcSwitches"
          }
        }
      },
      events: [
        {
          on: "SwitchOutlets",
          goto: "Switch",
          do: {
            service: "urc4esh", // service name changed: urc --> urc4esh
            name: "setState",
            parameters: [
              "${SelectOneOfMany.thingLabel}", // parameter socketName changed: --> thingLabel
              "${SelectOneOfMany.channelLabel}", // parameter targetID changed: --> channelLabel
              "${SwitchOutlets}"
            ],
            parameterMapping: [
              undefined,
              undefined,
              { name: "mapSwitchToUrc" }
            ]
          }
        },
        { on: "MetaGoto('back')", goto: "Outlets" }
      ]
    }
  ]
};

// Create the SituationFactory specific to the application domain
let engine = new myui.AdaptationEngine();
smarthome.factory = new smarthome.SmarthomeSituationFactory(engine);
engine.register(smarthome.service);

// Initialize the AaimBehavior and register aditional services
let behavior = new myui.AaimBehavior(smarthome.factory, smarthome.service);
behavior.registerService("urc4esh", new myui.urc.OpenhabService()); //<== service-Class changed: UchService() --> OpenhabService()
behavior.registerService("asterics", new myui.asterics.AreService(areURI));

// Create the AaimInterpreter and load the applications AAIM
let interpreter = new myui.AaimInterpreter(behavior);
interpreter.load(aaim);
smarthome.factory.situationEventHandler = interpreter;

// Start the interpreter when document loading is completed
window.onload = function() {
  // Configure factory
  smarthome.factory.header = document.querySelector("header");
  smarthome.factory.main = document.querySelector("main");
  
  // Run the AAIM
  interpreter.running = true;
  
  // Load profile
  new awc.AjaxProfileStore("profiles/currentuser.json");
};

}());