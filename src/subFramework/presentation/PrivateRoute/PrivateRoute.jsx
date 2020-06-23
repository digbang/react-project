import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, redirectPath, ...rest }) => {
  if (isAuthenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />
  }

  return (
    <Redirect
      to={{
        pathname: redirectPath,
      }}
    />
  )
}

PrivateRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default PrivateRoute
