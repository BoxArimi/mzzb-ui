import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './index.css'

import App from './App'
import Loading from './lib/loading'
import NotFound from './components/not-found'
import * as Loadable from 'react-loadable'
import routes, { RouteInfo } from './common/routes'
import registerServiceWorker from './registerServiceWorker'

export const async = (loader: () => any) => {
  return Loadable({
    loader: loader,
    loading: Loading,
    delay: 300,
    timeout: 5000,
  })
}

const renderRoute = (route: RouteInfo, key: number): React.ReactNode => {
  if (route.hasRoutes) {
    return route.routes.map(renderRoute)
  } else {
    return (
      <Route key={key} path={route.matchPath} component={async(route.component)}/>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Redirect exact={true} path="/" to="/admin/sakura"/>
        {routes.map(renderRoute)}
        <Route path="/not-found" component={NotFound}/>
        <Redirect exact={true} path="*" to="/not-found"/>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
