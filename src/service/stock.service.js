'use strict';
import {service, inject} from '../core/inject'
import {AbstractService} from './abstract.service';

@service
export class StockService extends AbstractService {

    @inject
    stockRepo

    constructor() {
        super('stockRepo')
    }
}