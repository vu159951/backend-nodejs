'use strict';
import {service, inject} from '../core/inject'
import {AbstractService} from './abstract.service';

@service
export class AccountService extends AbstractService {

    @inject
    accountRepo

    constructor() {
        super('accountRepo')
    }
}