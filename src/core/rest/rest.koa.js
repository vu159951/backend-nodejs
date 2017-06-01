import _ from 'lodash';
import recursive  from 'recursive-readdir-sync';

class KoaRouteService {
    static init(cfg) {
        if (!cfg.router || !cfg.scanDir) throw new Error("Koa Router and ScanDir are required");

        function isRest(target) {
            return Object.keys(target).filter(rest => !!target[rest].$rest).map(rest => target[rest]);
        }

        let files = recursive(cfg.scanDir);

        // init all rest endpoints
        _.flatMap(files.map(require).map(isRest)).forEach(restful => {
            let rest = injectionService.get(restful.$injector_name);
            if (!rest) rest = new restful();
            Object.values(rest.$rest_configs).forEach(restCfg => {
                cfg.router[restCfg.httpMethod](restful.$rest_context_path + restCfg.path, ...[...restCfg.middlewares, async function () {
                    // try {
                    this.body = restCfg.paramMappers ?
                        await restCfg.targetMethod.apply(rest, restCfg.paramMappers.map(mapper => mapper.call(this))) :
                        await restCfg.targetMethod.call(rest, this);
                    // } catch (ex) {
                    //     console.error(ex)
                    //     this.status = 500;
                    //     this.body = ex.message;
                    // }
                }])
            })
        });
    }
}

function body() {
    return this.request.body;
}


function bParam(name) {
    return function () {
        return this.request.body[name];
    }
}

function pParam(name) {
    return function () {
        return this.params[name];
    }
}

function qParam(name) {
    return function () {
        return this.params[name];
    }
}

function ctx() {
    return this;
}

export {
    KoaRouteService,
    body,
    bParam,
    pParam,
    qParam,
    ctx
}