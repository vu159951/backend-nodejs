import {InjectionService} from './core/inject';
import {KoaRouteService} from './core/rest';
import {SocketIOService} from './core/websocket';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import KoaJwt from 'koa-jwt';
import Loki from 'lokijs';
import KoaStatic from 'koa-static-folder';
import KoaSocketIO from 'koa-socket';

let lokiDb = new Loki('./database.json', {autosave: true, autosaveInterval: 5000, autoload: true}),
    socketIO = new KoaSocketIO(),
    koa = new Koa(),
    koaRouter = new KoaRouter();

InjectionService.init({scanDir: __dirname, injectors: {lokiDb: lokiDb, socketIO: socketIO}});
KoaRouteService.init({scanDir: `${__dirname}/rest`, router: koaRouter});
SocketIOService.init({scanDir: `${__dirname}/ws`, socketIO: socketIO});

socketIO
    .attach(koa);

koa
    .use(KoaJwt({secret: 'fcp'}).unless({path: [/^\/esdoc/,/^\/api\/accounts\/auth/]}))
    .use(KoaStatic('./esdoc'))
    .use(KoaBodyParser())
    .use(koaRouter.routes())
    .use(koaRouter.allowedMethods())
    .listen(8080);

console.log('Dashboard API is listening on port 8080');

//Simulate stock's price changed
setInterval(function () {
    const stockRepo = injectionService.get('stockRepo'),
        stocks = stockRepo.getAll();

    for (let stock of stocks) {
        stock.price = Number((stock.price + ((Math.random() * 21) - 10)).toFixed(2));
        stock.change = Number(((Math.random() * 4) - 2).toFixed(2));
        stockRepo.update(stock);
        socketIO.broadcast(`stocks:${stock.code}:_realtime`, stock);
    }
}, 1000);

//Sample JWT
//authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrbXMtdGVjaG5vbG9neSIsImlhdCI6MTQ3MTI1NzA5OSwiZXhwIjoxNTAyNzkzMTU1LCJhdWQiOiJ3d3cua21zLXRlY2hub2xvZ3kuY29tIiwic3ViIjoiYWRtaW4ifQ._ytLAJJvf6o9vv7NWC6vp1taCLLLFTKY7ketbbQz_o0
