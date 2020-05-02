define('catchfun/mediator', ['hilo/event/EventMixin', 'hilo/core/Class'], function(EventMixin, Class){

/**
 * @module catchfun/mediator
 * @requires hilo/event/EventMixin
 * @requires hilo/core/Class
 */
var mediator = Class.mix({}, EventMixin);

return mediator;

});