import React from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterLink, Route as RouterRoute } from 'react-router-dom'
import { StoreContext } from 'subFramework'

class Route extends RouterRoute {
  static contextType = StoreContext

  static propTypes = {
    permission: PropTypes.string.isRequired,
  }

  render() {
    const { permission } = this.props
    const { authStore } = this.context

    this.props.location.state = { permission: true }

    if (!authStore.can(permission)) {
      return null
    }

    return super.render()
  }
}

class NavLink extends React.PureComponent {
  static propTypes = {
    permission: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }
  static contextType = StoreContext

  render() {
    const { permission, to, children, ...params } = this.props
    const { authStore } = this.context

    if (!authStore.can(permission)) {
      return null
    }

    return (
      <RouterLink to={to} {...params}>
        {children}
      </RouterLink>
    )
  }
}

class Gated extends React.PureComponent {
  static propTypes = {
    permission: PropTypes.string.isRequired,
  }

  static contextType = StoreContext
  static NavLink = NavLink
  static Route = Route

  render() {
    const { authStore } = this.context
    const { permission, children } = this.props

    if (!authStore.can(permission)) {
      return null
    }

    return children
  }
}

export default Gated
