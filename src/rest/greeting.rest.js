'use strict';

import {restContext, get, paramMapping, pParam} from '../core/rest'
import {rest} from '../core/inject'

/**
 * Greeting Restful API
 */
@rest
@restContext('/greetings')
export class GreetingRest {
  greetings = {
    en: {message: 'Hello'},
    fr: {message: 'Bonjour'},
    vi: {message: 'Xin Chào'},
    ja: {message: 'Kon-nichiwa'},
    ko: {message: 'An-nyong Ha-se-yo'}
  }

  @get('/:lang')
  @paramMapping(pParam('lang'))
  getMessage(lang) {
    return this.greetings[lang] || {message: 'Hello'};
  }

  @get('/')
  getMessages() {
    return this.greetings;
  }

}