'use strict';
import {service, inject} from '../core/inject'
import {AbstractService} from './abstract.service';

@service
export class ContactService extends AbstractService {

    @inject
    contactRepo

    constructor() {
        super('contactRepo')
    }
}