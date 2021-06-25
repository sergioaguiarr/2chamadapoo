
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Exames from '../pages/Exames'

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Exames} />
  </Switch>
)

export default Routes
