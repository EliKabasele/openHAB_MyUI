var smarthome = smarthome || {};

(function() {
'use strict';
/**
 * 
 */
class SmarthomeSituationFactory extends myui.SituationFactory {
  constructor(adaptationEngine) {
    super(adaptationEngine);
    
    this._header = undefined;
    this._main = undefined;
    
    this._handler = undefined;
  }
  
  set header(element) {
    this._header = element;
  }
  
  get header() {
    return this._header;
  }
  
  set main(element) {
    this._main = element;
  }
  
  get main() {
    return this._main;
  }
  
  create(situation, parameters, context) {
    this._clearContents(this._header);
    this._clearContents(this._main);
    
    let title = document.createElement("myui-titlebar");
    title.innerText = situation;
    this._header.appendChild(title);
    title.resultHandler = function(result) {
      this._handler.executeEvent(`MetaGoto('${result}')`);
    }.bind(this);
    this._engine.register(title);
    
    if (situation === "SelectService") {
      let menu = document.createElement("myui-mainmenu");
      let parent = this._main;
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          menu.services = result;
          parent.appendChild(menu);
        });
      } else {
        menu.services = parameters;
        parent.appendChild(menu);
      }
      
      menu.resultHandler = function(result) {
        this._handler.executeEvent(`SelectService('${result.id}')`);
      }.bind(this);
      
      this._engine.register(menu);
      
    } else if (situation === "SelectOneOfMany") {
      let menu = document.createElement("myui-mainmenu");
      let parent = this._main;
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          menu.services = result;
          parent.appendChild(menu);
        });
      } else {
        menu.services = parameters;
        parent.appendChild(menu);
      }
      
      menu.resultHandler = function(result) {
        context.set("SelectOneOfMany", result);
        this._handler.executeEvent("SelectOneOfMany");
      }.bind(this);
      
      this._engine.register(menu);
      
    } else if (situation === "AdjustLight") {
      let colors = document.createElement("myui-colorselector");
      let parent = this._main;
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          colors.currentColor = result;
          parent.appendChild(colors);
        });
      } else {
        colors.currentColor = parameters[0];
        parent.appendChild(colors);
      }
      
      colors.resultHandler = function(result) {
        context.set("AdjustLight", result);
        this._handler.executeEvent("AdjustLight");
      }.bind(this);
      
      this._engine.register(colors);
    
    } else if (situation === "SwitchOutlets") {
      let switches = document.createElement("myui-switches");
      let parent = this._main;
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          switches.switches = result;
          parent.appendChild(switches);
        });
      } else {
        switches.switches = parameters[0];
        parent.appendChild(switches);
      }
      
      switches.resultHandler = function(result) {
        context.set("SwitchOutlets", result);
        this._handler.executeEvent("SwitchOutlets");
      }.bind(this);
      
      this._engine.register(switches);
    
    } else {
      let params = document.createElement("pre");
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          params.innerText = JSON.stringify(result);
        });
      } else {
        params.innerText = JSON.stringify(parameters);
      }
      this._main.appendChild(params);
      this._engine.register(params);
    }
  }
  
  refresh(situation, parameters, context) {
    if (situation === "AdjustLight") {
      let colors = this._main.querySelector("myui-colorselector");
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          colors.currentColor = result;
        });
      } else {
        colors.currentColor = parameters[0];
      }
      
    } else if (situation === "SwitchOutlets") {
      let switches = this._main.querySelector("myui-switches");
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          switches.switches = result;
        });
      } else {
        switches.switches = parameters[0];
      }
      
    } else if (situation === "SelectOneOfMany") {
      let menu = this._main.querySelector("myui-mainmenu");
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          menu.services = result;
        });
      } else {
        menu.services = parameters;
      }
      
    } else {
      let params = this._main.querySelector("pre");
      if (parameters instanceof Promise) {
        parameters.then(function(result) {
          params.innerText = JSON.stringify(result);
        });
      } else {
        params.innerText = JSON.stringify(parameters);
      }
    }
  }
  
  set situationEventHandler(handler) {
    this._handler = handler;
  } 
  
  get situationEventHandler() {
    return this._handler; 
  }
  
  _clearContents(element) {
    while (element.firstChild) {
      // Unregister from adaptation engine
      this._engine.unregister(element.firstChild);
      
      // Remove from document
      element.removeChild(element.firstChild);
    }
  }
}

// Register in namespace
smarthome.SmarthomeSituationFactory = SmarthomeSituationFactory;

})();