import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import App from './App'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { AdminSakura, NotFound } from './components'

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Redirect exact={true} path="/" to="/admin/sakura"/>
        <Route path="/admin/sakura" component={AdminSakura}/>
        <Route path="/not-found" component={NotFound}/>
        <Redirect exact={true} path="*" to="/not-found"/>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
