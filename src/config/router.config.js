import React from 'react'
import { Router, Switch ,Route, Redirect } from 'react-router-dom'
import history from '@/utils/history'

import App from '@/App'
import * as base from '@/pages/base'
import * as set from '@/pages/setting'

export default () => {
  return (
    <Router path="/" history={ history }>
      <Switch>
        <Route exact path="/login" component={base.Login} />
        <Route exact path="/register" component={base.Register}></Route>
        <Route exact path="/home" component={base.BasePage}></Route>
        <Route exact path="/setting" component={set.Setting}></Route>
        <Route exact path="/setting/changePassword" component={set.ChangePassword}></Route>
        <Redirect exact to="/login" from="/*"></Redirect>
      </Switch>
    </Router>
  )
}
