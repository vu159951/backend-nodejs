'use strict';
import {service, inject} from '../core/inject'
import {AbstractService} from './abstract.service';

@service
export class DashboardService extends AbstractService {

    @inject
    dashboardRepo

    constructor() {
        super('dashboardRepo')
    }
}