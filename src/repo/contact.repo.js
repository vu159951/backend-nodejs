'use strict';

import {repo} from '../core/inject'
import {LokiAbstractRepo} from './loki-abstract.repo'

@repo
export class ContactRepo extends LokiAbstractRepo {
    constructor() {
        super('contacts');
    }
}