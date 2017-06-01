'use strict';

import _ from 'lodash';
import recursive  from 'recursive-readdir-sync';

/**
 * @param {string} contextPath
 * @returns {Decorator}
 */
function restContext(contextPath) {
    return function (target) {
        target.$rest = true;

        // context path with '/api' prefix by default
        target.$rest_context_path = '/api' + contextPath;
    }
}

function createHttpMethodDecorator(httpMethod) {
    return (path, ...middlewares) => {
        return (target, method, descriptor) => {
            target.$rest_configs = target.$rest_configs || {};
            target.$rest_configs[method] = _.extend(target.$rest_configs[method], {
                httpMethod: httpMethod,
                targetMethod: descriptor.value,
                path: path,
                middlewares: middlewares
            });
        }
    }
}

const [get,post,put, del] = ['get', 'post', 'put', 'del'].map(createHttpMethodDecorator);

/**
 * @param {[Function]} paramMappers list of mapper functions
 * @returns {Decorator}
 */
function paramMapping(...paramMappers) {
    return (target, method, descriptor) => {
        target.$rest_configs = target.$rest_configs || {};
        target.$rest_configs[method] = _.extend(target.$rest_configs[method], {
            paramMappers: paramMappers
        })
    }
}

export {
    restContext,
    get,
    post,
    put,
    del,
    paramMapping
}