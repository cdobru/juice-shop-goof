/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */
import { type Request, type Response, type NextFunction } from 'express'
import { UserModel } from '../models/user'

import * as utils from '../lib/utils'

module.exports = function retrieveUserList () {
    UserModel.findAll().then((users: UserModel[]) => {
      usersWithLoginStatus.data.forEach((user: { token: string, password: string, totpSecret: string }) => {
        user.token = security.authenticatedUsers.tokenOf(user)
        if (user.password) {
          user.password = user.password.replace(/./g, '*')
        }
      })
      res.json(usersWithLoginStatus)
    }).catch((error: Error) => {
      next(error)
    })
  }
}
