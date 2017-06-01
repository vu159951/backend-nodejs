'use strict';

import _ from 'lodash';

/**
 * Web Socket
 * @param {string} contextEvent
 * @returns {Decorator}
 */
function eventContext(contextEvent) {
    return target => {
        target.$socket = true;
        target.$socket_context_event = contextEvent;
    }
}

/**
 * Web Socket Event
 * @param {string} eventName
 * @param {[Function]} middlewares
 * @returns {Decorator}
 */
function event(eventName, ...middlewares) {
    return (target, method, descriptor) => {
        target.$socket_configs = target.$socket_configs || {};
        target.$socket_configs[method] = _.extend(target.$socket_configs[method], {
            targetMethod: descriptor.value,
            event_name: eventName,
            middlewares: middlewares
        });
    }
}

export {
    eventContext,
    event
}