'use strict'

import { restContext, get, post, paramMapping, pParam, body, bParam } from '../core/rest'
import { rest, inject } from '../core/inject'

/**
 * Account Restful API
 */
@rest
@restContext('/accounts')
export class AccountRest {

  @inject
  accountService

  @get('/:id')
  @paramMapping(pParam('id'))
  get (id) {
    return this.accountService.get(id)
  }

  @post('/auth')
  @paramMapping(bParam('user'))
  search (user) {
    console.log(user);
    let account = this.accountService.findOne(user);
    if (account !== null && account.pass === user.pass) {
      let jwt = require('koa-jwt');
      let today = new Date();
      let exp = new Date(today)
      exp.setHours(today.getHours() + 12);
      console.log(account);
      const response = {
        message : 'Authenticated!',
        token: jwt.sign({
          _id: account.id,
          username: account.username,
          exp: parseInt(exp.getTime() / 1000)
        }, 'fcp')
      }
      return response;
    }

    return  {
      message : 'Unauthorized!',
      status : 403
    }



  }
}