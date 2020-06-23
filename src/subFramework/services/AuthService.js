import axios from 'axios'
import Cookies from 'js-cookie'
import AuthUser from '../models/AuthUser'

class AuthService {
  /** returns an AuthUser, this function should be implemented by the children class to customize AuthUser data * */
  getAuthUserFromJson = (data) => AuthUser.fromJson(data)

  getAuthUserFromCookie = (data) => AuthUser.fromCookie(data)

  /** sets whatever is needed for loadAuthUserFromBrowser to work * */
  persistLoginData = (authUser) => Cookies.set('authUser', JSON.stringify(authUser))

  /** sets whatever is needed for loadAuthUserFromBrowser to work * */
  getStoredLoginData = () => {
    return Cookies.get('authUser')
  }

  /** removes whatever was setted in persistLoginData * */
  removePersistedData = () => {
    Cookies.remove('authUser')
  }

  /** should return the athentication api endpoint url * */
  getAuthenticateUri = () => {
    return '/api/authentication/authenticate'
  }

  /** should return the logout api endpoint url * */
  getLogoutUri = () => {
    return '/api/authentication/logout'
  }

  authenticate = (email, password) =>
    axios
      .post(this.getAuthenticateUri(), {
        email,
        password,
      })
      .then(({ data }) => {
        const authUser = this.getAuthUserFromJson(data.data)

        this.persistLoginData(authUser)

        return authUser
      })

  logout = () => {
    axios.get(this.getLogoutUri()).then(({ data }) => data)

    this.removePersistedData()

    return true
  }

  loadAuthUserFromBrowser = () => {
    const authUser = this.getStoredLoginData()

    if (authUser) {
      return this.getAuthUserFromCookie(JSON.parse(authUser))
    }

    return null
  }
}

export default AuthService
