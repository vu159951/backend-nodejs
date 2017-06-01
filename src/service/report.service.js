'use strict';
import {service, inject} from '../core/inject'
import _ from 'lodash';

@service
export class ReportService {

    @inject
    lokiDb

    countBy(collectionName, field) {
        let collection = this.lokiDb.getCollection(collectionName);

        if (!collection) return {};

        return _.countBy(collection.find(), field);
    }

}