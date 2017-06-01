import {eventContext, event} from '../core/websocket'
import {websocket, inject} from '../core/inject'


/**
 * Account Web Socket API
 */
@websocket
@eventContext('stocks:')
export class AccountWebSocket {

    @inject
    stockService

    @event('_all')
    getAll() {
        return this.stockService.getAll();
    }
}