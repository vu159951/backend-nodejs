'use strict';

import {restContext, get, paramMapping, pParam} from '../core/rest'
import {rest, inject} from '../core/inject'

/**
 * Report Restful API
 */
@rest
@restContext('/reports')
export class ReportRest {

    @inject
    reportService

    @get('/_countBy/:collection/:field')
    @paramMapping(pParam('collection'), pParam('field'))
    async countBy(collection, field) {
        return await this.reportService.countBy(collection, field);
    }

}