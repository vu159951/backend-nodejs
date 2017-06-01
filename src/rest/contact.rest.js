'use strict';

import {restContext, get, put, post, del, paramMapping, pParam, body} from '../core/rest'
import {rest, inject} from '../core/inject'

/**
 * Contract Restful API
 */
@rest
@restContext('/contacts')
export class ContactRest {

    @inject
    contactService

    @get('/')
    getAll() {
        return this.contactService.getAll();
    }

    @get('/:id')
    @paramMapping(pParam('id'))
    get(id) {
        return this.contactService.get(id);
    }

    @post('/')
    @paramMapping(body)
    insert(contact) {
        return this.contactService.insert(contact);
    }

    @put('/:id')
    @paramMapping(pParam('id'), body)
    update(id, contact) {
        contact.id = id;
        return this.contactService.update(contact);
    }

    @del('/:id')
    @paramMapping(pParam('id'))
    remove(id) {
        return this.contactService.remove(id);
    }

    @post('/_search')
    @paramMapping(body)
    search(criteria) {
        return this.contactService.find(criteria);
    }
}