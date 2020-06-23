import { observable, action, computed } from 'mobx'
import moment from 'moment'
import AsyncStore from './AsyncStore'
import AuthService from '../services/AuthService'

const getJWTExpDate = (token) => moment(JSON.parse(atob(token.split('.')[1])).exp * 1000)

class AuthStore extends AsyncStore {
  @observable authUser = null
  authService
  logoutTimeout

  constructor(authService = new AuthService()) {
    super()

    this.isLoading = false
    this.authService = authService

    this.loadAuthFromBrowser()
  }

  /** verifies if token is valid or expired * */
  // eslint-disable-next-line
  checkTokenStatus(token) {
    if (this.getTimeToExpiration(token) <= 0) {
      return 'expired'
    }

    return 'valid'
  }

  /** returns remaining time for token expiration * */
  // eslint-disable-next-line
  getTimeToExpiration(token) {
    if (token && token !== 'undefined') {
      const expDate = getJWTExpDate(token) // token expiration date
      return moment.utc(moment(expDate).diff(moment())).valueOf() // remaining token time
    }

    return 0
  }

  loadAuthFromBrowser() {
    this.preRequest()

    const authUser = this.authService.loadAuthUserFromBrowser()

    /** if token exists and it's not expired, renews credentials * */
    if (authUser && this.checkTokenStatus(authUser.token) !== 'expired') {
      return this.authenticate(authUser).then(() => {
        this.onSuccessRequest()
        this.keepAlive()
      })
    }

    // logs out user if token is missing
    // or if token is expired
    this.logout()

    this.onSuccessRequest()

    return null
  }

  @action
  basicLogin(username, password) {
    return this.authService.authenticate(username, password).then((authUser) => {
      this.authenticate(authUser)

      return authUser.token
    })
  }

  authenticate(authUser) {
    this.updateAuthUser(authUser)
    this.setLogoutTimer(authUser.token)

    return Promise.resolve()
  }

  /** logs out the user if token expires during session time * */
  setLogoutTimer(token) {
    clearTimeout(this.logoutTimeout)

    // logs out the user once the token expires
    this.logoutTimeout = setTimeout(() => {
      if (this.checkTokenStatus(token) === 'expired') {
        this.logout(true)
      }
    }, this.getTimeToExpiration(token))
  }

  @action
  updateToken(token) {
    if (this.authUser) {
      this.authUser.updateToken(token)
    }
  }

  @action
  updateAuthUser(authUser) {
    this.authUser = authUser
  }

  @computed
  get isAuthenticated() {
    return this.authUser !== null && this.checkTokenStatus(this.authUser.token) !== 'expired'
  }

  @action
  // eslint-disable-next-line class-methods-use-this
  keepAlive() {}

  @action
  // eslint-disable-next-line class-methods-use-this
  logout() {
    this.authService.logout()
    this.authUser = null
  }

  // eslint-disable-next-line class-methods-use-this
  get dashboardRoute() {
    return '/'
  }

  can = (permission) => permission === 'yes' || this.authUser.permissions.includes(permission)
}

export default AuthStore
