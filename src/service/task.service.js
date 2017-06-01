'use strict';
import {service, inject} from '../core/inject'
import {AbstractService} from './abstract.service';

@service
export class TaskService extends AbstractService {

    @inject
    taskRepo

    constructor() {
        super('taskRepo')
    }
}