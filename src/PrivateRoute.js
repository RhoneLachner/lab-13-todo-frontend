import React from 'react'
import { Route, Redirect } from 'react-router-dom'

//ONLY SHOWN WHEN USER IS LOGGED IN ALREADY.

const PrivateRoute = ({ render: Component, ...rest }) => {
  return (   
    <Route
      {...rest}
      render={props => (rest.token ? <Component {...props} {...rest} /> : 
      <Redirect to="/login" />)}
    />
  )
}

export default PrivateRoute
