'use strict';

import {restContext, get, put, post, del, paramMapping, pParam, body} from '../core/rest'
import {rest, inject} from '../core/inject'

/**
 * Task Restful API
 */
@rest
@restContext('/tasks')
export class TaskRest {

    @inject
    taskService

    @get('/')
    getAll() {
        return this.taskService.getAll();
    }

    @get('/:id')
    @paramMapping(pParam('id'))
    get(id) {
        return this.taskService.get(id);
    }

    @post('/')
    @paramMapping(body)
    insert(task) {
        return this.taskService.insert(task);
    }

    @put('/:id')
    @paramMapping(pParam('id'), body)
    update(id, task) {
        task.id = id;
        return this.taskService.update(task);
    }

    @del('/:id')
    @paramMapping(pParam('id'))
    remove(id) {
        return this.taskService.remove(id);
    }

    @post('/_search')
    @paramMapping(body)
    search(criteria) {
        return this.taskService.find(criteria);
    }
}