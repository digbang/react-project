// eslint-disable-next-line max-classes-per-file
import React from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterLink, Route as RouterRoute } from 'react-router-dom'
import { StoreContext } from 'subFramework'

class Route extends RouterRoute {
  // eslint-disable-next-line react/static-property-placement
  static contextType = StoreContext

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    permission: PropTypes.string.isRequired,
  }

  render() {
    const { permission } = this.props
    const { authStore } = this.context

    // this.props.location.state = { permission: true }

    if (!authStore.can(permission)) {
      return null
    }

    return super.render()
  }
}

class NavLink extends React.PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    permission: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }

  // eslint-disable-next-line react/static-property-placement
  static contextType = StoreContext

  render() {
    // eslint-disable-next-line react/prop-types
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
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    permission: PropTypes.string.isRequired,
  }

  // eslint-disable-next-line react/static-property-placement
  static contextType = StoreContext
  static NavLink = NavLink
  static Route = Route

  render() {
    const { authStore } = this.context
    // eslint-disable-next-line react/prop-types
    const { permission, children } = this.props

    if (!authStore.can(permission)) {
      return null
    }

    return children
  }
}

export default Gated
