import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({
  component:Component,
  auth: { isAuth, isLoading },
  ...restProps
}) => (
    <Route
      {...restProps}
      render={props => !isAuth && !isLoading
        ? <Redirect to='/' />
        : <Component {...props} />
      }
    />
  );

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute)