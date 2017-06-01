'use strict';

import {restContext, get, put, paramMapping, pParam, body} from '../core/rest'
import {rest, inject} from '../core/inject'

/**
 * Dashboard Restful API
 */
@rest
@restContext('/dashboards')
export class DashboardRest {

    @inject
    dashboardService

    @get('/')
    getAll() {
        return this.dashboardService.getAll();
    }

    @get('/:id')
    @paramMapping(pParam('id'))
    get(id) {
        return this.dashboardService.get(id);
    }

    @put('/:id')
    @paramMapping(pParam('id'), body)
    update(id, dashboard) {
        dashboard.id = id;
        return this.dashboardService.update(dashboard);
    }

}