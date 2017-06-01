'use strict';

export class AbstractService {

    constructor(repoProp) {
        this.repoProp = repoProp;
    }

    get(id) {
        return this[this.repoProp].get(id);
    }

    insert(obj) {
        return this[this.repoProp].insert(obj);
    }

    update(obj) {
        return this[this.repoProp].update(obj);
    }

    remove(id) {
        return this[this.repoProp].remove(id);
    }

    findOne(criteria) {
        return this[this.repoProp].findOne(criteria);
    }

    find(criteria) {
        return this[this.repoProp].find(criteria);
    }

    getAll() {
        return this[this.repoProp].getAll();
    }
}