import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import App from './App'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { AdminSakura } from './components'

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Redirect exact={true} path="/" to="/admin/sakura"/>
        <Route path="/admin/sakura" component={AdminSakura}/>
        <Redirect exact={true} path="*" to="/404"/>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
