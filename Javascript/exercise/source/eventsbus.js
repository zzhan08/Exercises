'use strict';
let _ = require("underscore");


module.exports.eventsbus = new function() {
  var _events = {};
  var _queue = {};

 
  this.addHandler = function(eventName, handler, priority)  {
    var handlerId = null;

    if (!(eventName in _events)) {
      _events[eventName] = [];
    }

    handlerId = _generateHandlerId();

    _events[eventName][handlerId] = handler;

    delete _queue[eventName];

    return handlerId;

  };

  
  this.getHandlers = function (eventName) {
    // See if we already have sorted listeners
    if (_queue[eventName]) {
      return _queue[eventName];
    }

    // No listeners for this event.
    if (!_events[eventName]) {
      return [];
    }

    _queue[eventName] = _events[eventName];

    return _queue[eventName];
  };
  this.emitEvent = function(eventName, args) {
    if (!(eventName in _events)) {
      return;
    }

    if (!Array.isArray(args)) {
      args = [args];
    }

    var handlers = this.getHandlers(eventName);

    var handlerIdx;

    for (handlerIdx in handlers) {
      handlers[handlerIdx].apply(null, args);
    }
  };

  function _generateHandlerId() {
    return Math.random().toString(36).substr(2, 15);
  }
  return this;
};
