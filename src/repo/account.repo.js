'use strict';

import {repo} from '../core/inject'
import {LokiAbstractRepo} from './loki-abstract.repo'

@repo
export class AccountRepo extends LokiAbstractRepo {
    constructor() {
        super('accounts');
    }
}