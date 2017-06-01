'use strict';

import {restContext, get, paramMapping, pParam} from '../core/rest'
import {rest, inject} from '../core/inject'

/**
 * Stock Restful API
 */
@rest
@restContext('/stocks')
export class StockRest {

    @inject
    stockService

    @get('/')
    getAll() {
        return this.stockService.getAll();
    }

    @get('/:id')
    @paramMapping(pParam('id'))
    get(id) {
        return this.stockService.get(id);
    }
}