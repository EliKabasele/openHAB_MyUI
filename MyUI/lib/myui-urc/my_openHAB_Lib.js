/* 

    JavaScript Library for OpenHAB Object.

    Use of the FETCH API => Interface for fetching resources, like using  XMLHttpRequest but more powerfull and has flexible feature set.

    List of exported functions:

        1) getAllThings:            Retrieve all Things from the OpenHAB-runtime (Server).
        2) getOneSpecificThing:     Retrieve a specific Thing by his UID from the OpenHAB-runtime (Server).
        3) getState_value:          Get the current State- values of an Item.
        4) setState_values:         Send new values for the state to the openHAB- runtime (Server).
        5) sendCommand:             Post (POST. Request) state new values for the Item on the openHAB- runtime (Server).
                                    
        

    List of internal functions:
    
        1) provideLinkedItem:       Linked Item is composed of: Item-Label and Channel-Label.(e.g: RemActLight_Farbe). 
                                    so it can match with the corresponding string-part on the Item-name (used as URL parameter).



    Author: Eli Kabasele Kabasele, ek058@hdm-stuttgart.de  
    
    *************************************************************************************************

    /**
        Variables global for the OpenHAB-Object
     */

    const openHAB_IP = 'localhost'; //should be replaced with the IP Address of the actuel OpenHAB
    
    const PORT = '8080';

    const BASE_URL = 'http://' + openHAB_IP + ':'+ PORT + '/rest';
     
    let thing_UID = '',
        thing_label = '',
        currentState = '',
        channel_ID = '',
        availble_Channels = [],
        allThings = [],
        thing_object = {},
        thing_status = ''
 
               
     
//***************************************************************************************************        

/**
   Definition of the Namespace:  OpenHAB-Object
*/

let openHAB_Object = {
     
    
    /*********************************************************************
     1) getAllThings: Retrieve all Things from the OpenHAB-runtime (Server).
        Return: Array with All Things available in the System and contain following properties:
            thing_label: Name or Label for Thing
            thing_UID: UID of the Thing
            thing_status: Status of the Thing
    */
   getAllThings: function () {
   
       fetch (BASE_URL + '/things')
          .then ( (res) => res.json() )
          .then ( (data) => {
             
              data.forEach(thing => {

                  thing_UID = thing.UID;
                  thing_label = thing.label;
                  thing_status = thing.statusInfo.status;

                  allThings.push ( {
                      'Thing_name': thing_label,
                      'Thing_UID': thing_UID,
                      'Thing_status': thing_status
                  });

                            
              });

          })
          .catch ( (err) => console.log (err))

          console.log (allThings);
          return allThings;
   },

  

    /*********************************************************************************
     2) getOneSpecificThing:  Retrieve a specific Thing by his UID from the OpenHAB-runtime (Server).
        Return: A thing Object by his UID and contains following properties:
            thing_label: Name or Label for Thing
            thing_available_Channels: Array of All Channels availble for the Thing
            think_link : Link (URL) of the Thing

    */
    getOneSpecificThing: function (thing_UID) {

       //local Variables (to this function)
       let channel_description = '';
       let linkedItem = '';
       let thing_link = '';
       let channel_label = '';


       fetch (BASE_URL + '/things/' + thing_UID)
           .then ( (res) => res.json() )
           .then ( (data) => {
            
               thing_label = data.label;
               thing_link = BASE_URL + '/things/' + thing_UID
               data.channels.forEach (channel => {

                   channel_label = channel.label;
                   channel_ID = channel.id;
                   linkedItem = channel.linkedItems;
                   channel_description = channel.description;

                   availble_Channels.push ( {
                       'Channel_name': channel_label,
                       'Linked_Items': linkedItem,
                       'Channel_ID': channel_ID,
                       'Channel_description': channel_description
                   })
                
               })

               thing_object = {
                   'Thing_name': thing_label,
                   'Thing_link': thing_link,
                   'Available_channels': availble_Channels
               } 
                         
               console.log (thing_object);  

           })
           .catch ( (err) => console.log (err));       
      
           return thing_object;      
   },

  


    /**********************************************************************************  
    3) getCurrentState:  Get the current State- values of an Item.
        Return: A String => current State- value for the Item 
            
    */
    getState_value: function (thing_label, channel_label) {

        let url_param = openHAB_Object.provideLinkedItem (thing_label, channel_label); 

        let item_URL = BASE_URL + '/items/' + url_param + '/state';

        fetch (item_URL)
            .then ( (res) => res.text())
            .then ( (data) => {
                currentState = data;
            })

            return currentState; 
   },



    /************************************************************************************
     4) setState_values:  update (PUT- Request) state new values for the Item on the openHAB- runtime (Server).
        display the Response status and statusText
    */
    setState_values: function (thing_label, channel_label, stateValue) {

        let url_param = openHAB_Object.provideLinkedItem (thing_label, channel_label); 

        let item_URL = BASE_URL + '/items/' + url_param + '/state';

      
       fetch (item_URL, {

           method: 'PUT',
           headers: {
               'Accept': 'application/json',
               'content-type': 'text/plain'
           },
           body: stateValue 
       })
        
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Request-status and Status-text: ', response.status + ', ' + response.statusText));

   },



    /*********************************************************************************
     5) sendCommand:  post (POST. Request) state new values for the Item on the openHAB- runtime (Server).
        display the Response status and statusText
    */   
    sendCommand: function (thing_label, channel_label, commandValue) {

        let url_param = openHAB_Object.provideLinkedItem (thing_label, channel_label); 

        let item_URL = BASE_URL + '/items/' + url_param ;

        fetch (item_URL, {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'text/plain'
        },
        body: commandValue
        })
        
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Request-status and Status-text: ', response.status + ', ' + response.statusText));

},




/* -------------------------------  INTERNAL FUNCTIONS below  ----------------------------------- */

   /***********************************************************************
     The method returns a string, the linkedItem composed of Thing-Label (e.g RemActLight) 
     and Channel-Label (e.g Farbe) => linkedItem = RemActLight_Farbe
    */
   provideLinkedItem: function (thingLabel, channelLabel) {
         
        var res = thingLabel + '_' + channelLabel;
       
        console.log ("LinkedItem: " + res);
        return res ;
    },

}


          