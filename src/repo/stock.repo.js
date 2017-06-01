'use strict';

import {repo} from '../core/inject'
import {LokiAbstractRepo} from './loki-abstract.repo'

@repo
export class StockRepo extends LokiAbstractRepo {
    constructor() {
        super('stocks');
    }
}