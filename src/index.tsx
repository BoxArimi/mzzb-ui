import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import App from './App'
import { async } from './components/loading'

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Redirect exact={true} path="/" to="/admin/sakura"/>
        <Route path="/admin/sakura" component={async(() => import('./components/admin-sakura'))}/>
        <Route path="/not-found" component={async(() => import('./components/not-found'))}/>
        <Redirect exact={true} path="*" to="/not-found"/>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
