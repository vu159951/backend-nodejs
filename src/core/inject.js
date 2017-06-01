'use strict';

import _ from 'lodash';
import recursive  from 'recursive-readdir-sync';

class InjectionService {

    constructor(injectors) {
        this.injectors = injectors || {};
    }

    register(injectableName, injector) {
        if (injectableName && injector) this.injectors[injectableName] = injector;
    }

    get(injectableName) {
        return this.injectors[injectableName];
    }

    static init(cfg) {
        global.injectionService = new InjectionService(cfg.injectors);

        function injectable(target) {
            return Object.keys(target).filter(injector => !!target[injector].$injector_type).map(injector => target[injector]);
        }

        let files = recursive(cfg.scanDir);

        // init
        _.flatMap(files.map(require).map(injectable))
            .forEach(injectable => injectionService.register(injectable.$injector_name, new injectable()));

        // inject
        Object
            .values(injectionService.injectors)
            .forEach(injector => (injector.$injected_props || []).forEach(prop => injector[prop] = injectionService.get(prop)));

        // post init
        Object
            .values(injectionService.injectors)
            .forEach(injector => (injector.$postconstruct_methods || []).forEach(method => injector[method].call(injector)));
    }
}

function createInjectionType(type) {
    return (target) => {
        if (_.isFunction(target)) {
            target.$injector_type = type;
            target.$injector_name = _.camelCase(target.name);
            return;
        }

        var name = target;
        return target => {
            target.$injector_type = type;
            target.$injector_name = name;
        }
    }
}
const [rest, service, repo, websocket] = ['rest', 'service', 'repo', 'websocket'].map(createInjectionType);

function inject(target, prop, descriptor) {
    descriptor.writable = true;
    target.$injected_props = target.$injected_props || [];
    target.$injected_props.push(prop);
}

function postConstruct(target, method) {
    target.$postconstruct_methods = target.$postconstruct_methods || [];
    target.$postconstruct_methods.push(method);
}

export {
    InjectionService,
    inject,
    rest,
    service,
    repo,
    websocket,
    postConstruct
}