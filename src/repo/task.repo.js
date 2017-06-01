'use strict';

import {repo} from '../core/inject'
import {LokiAbstractRepo} from './loki-abstract.repo'

@repo
export class TaskRepo extends LokiAbstractRepo {
    constructor() {
        super('tasks');
    }
}