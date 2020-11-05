import { observable, makeObservable } from 'mobx'

class AuthUser {
  permissions = []
  userId
  token
  email

  constructor(userId, email, token) {
    makeObservable(this, {
      token: observable,
    })

    this.userId = userId
    this.token = token
    this.email = email
  }

  updateToken(token) {
    this.token = token
  }

  addPermission(permission) {
    this.permissions.push(permission)
  }

  static fromJson({ id, email, token }) {
    return new AuthUser(id, email, token)
  }

  static fromCookie({ id, email, token }) {
    return new AuthUser(id, email, token)
  }
}

export default AuthUser
