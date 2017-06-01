import _ from 'lodash';
import recursive  from 'recursive-readdir-sync';

export class SocketIOService {
    static init(cfg) {
        if (!cfg.socketIO || !cfg.scanDir) throw new Error("socketIO and ScanDir are required");

        function isWebSocket(target) {
            return Object.keys(target).filter(webSocket => !!target[webSocket].$socket).map(webSocket => target[webSocket]);
        }

        let files = recursive(cfg.scanDir);

        // init all websocket events
        _.flatMap(files.map(require).map(isWebSocket)).forEach(WebSocket => {
            let socket = injectionService.get(WebSocket.$injector_name);
            if (!socket) socket = new WebSocket();
            Object.values(socket.$socket_configs).forEach(socketCfg => {
                let event = WebSocket.$socket_context_event + socketCfg.event_name;
                cfg.socketIO.on(event, async(ctx, data) => {
                    try {
                        ctx.socket.emit(event, {
                            success: true,
                            data: await socketCfg.targetMethod.call(socket, data, ctx)
                        });
                    } catch (ex) {
                        ctx.socket.emit(event, {success: false, err: ex.mesage});
                    }
                })

            })
        });
    }
}
