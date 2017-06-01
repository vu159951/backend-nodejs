'use strict';
import {inject} from '../core/inject'

/**
 * Loki Abstract Repo, that exposes the basic operations on Loki datatabse
 */
export class LokiAbstractRepo {

  @inject
  lokiDb

  _collectionName

  /**
   * @param {string} collectionName
   */
  constructor(collectionName) {
    this._collectionName = collectionName;
  }

  aliasId(doc) {
    if(!doc) return doc;
    doc = Object.assign({}, {id: doc.$loki}, doc);
    delete doc.$loki;
    return doc;
  }

  getCollection() {
    if (this._collection) return this._collection;
    return this._collection = this.lokiDb.getCollection(this._collectionName);
  }

  get(id) {
    return this.aliasId(this.getCollection().get(id));
  }

  insert(doc) {
    return this.aliasId(this.getCollection().insert(doc));
  }

  update(doc) {
    const exists = this.getCollection().get(doc.id);

    if (exists) return this.aliasId(this.getCollection().update(Object.assign(exists, doc)));

    return this.insert(doc);
  }

  remove(id) {
    const doc = this.getCollection().get(id);

    if (!doc) return null;

    return this.getCollection().remove(doc);
  }

  findOne(criteria) {
    return this.aliasId(this.getCollection().findOne(criteria));
  }

  find(criteria) {
    return this.getCollection().find(criteria).map(this.aliasId);
  }

  getAll() {
    return this.find();
  }
}