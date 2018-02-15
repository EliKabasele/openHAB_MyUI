(function() {
    'use strict';
    
    /**
     *  This Class OpenhabService uses the my_openHAB_Lib.js Namespace
     */
    class OpenhabService extends myui.AaimService {
      constructor() {
        super();
        
        this._functions.set("queryThings", this.queryThings);
        this._functions.set("currentState", this.currentState);
        this._functions.set("setState", this.setState);
      }
      
      queryThings(thing_UID) {
          /** 
              If the thing_UID is not specified! -> getAllThings() - Method from my_openHAB_Lib - Namespace
          */
        let allThings = openHAB_Object.getAllThings();
        
          /** 
              If the thing_UID is  specified! -> getOneSpecificThing() - Method from my_openHAB_Lib - Namespace
          */
        if (thing_UID) {

          let thing = openHAB_Object.getOneSpecificThing(thing_UID);  
          return thing
        } else {
          return allThings;
        }
      }
      
      currentState(thingLabel, channelLabel) {
        
        let values = {};
        
        values = openHAB_Object.getState_value(thingLabel, channelLabel);  
        return values;
      }
      
      setState(thingLabel, channelLabel, values) {
        
        openHAB_Object.setState_values (thingLabel, channelLabel, values);
      }

    }
    
    // Register in namespace
    myui.urc.OpenhabService = OpenhabService;
    
    })();