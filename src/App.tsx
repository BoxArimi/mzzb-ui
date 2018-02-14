import * as React from 'react'
import { Layout, Modal } from 'antd'
import './App.css'

import { loginManager, Result } from './utils/manager'
import * as Loadable from 'react-loadable'
import produce from 'immer'

export interface Session {
  userName: string
  isLogged: boolean
  userRoles: string[]
}

export interface AppState {
  viewSider: boolean
  viewModal: boolean
  submiting: boolean
  session: Session
}

export interface AppContext {
  state: AppState
  update: (reducer: (state: AppState) => AppState) => void
}

const async = (loader: () => any) => {
  return Loadable.Map({
    loading: () => null,
    loader: {
      Component: loader,
    },
    render(loaded: any, props: AppContext) {
      const Component = loaded.Component.default
      return <Component {...props} />
    }
  })
}

const AsyncAppSider = async(() => import('./layouts/app-sider'))

const AsyncAppHeader = async(() => import('./layouts/app-header'))

const AsyncAppFooter = async(() => import('./layouts/app-footer'))

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props)

    this.state = {
      viewSider: false,
      viewModal: false,
      submiting: false,
      session: {
        isLogged: false,
        userName: 'Guest',
        userRoles: [],
      },
    }
  }

  update = (reducer: (state: AppState) => AppState) => {
    this.setState(reducer(this.state))
  }

  async componentDidMount() {
    const result: Result<Session> = await loginManager.check()
    if (result.success) {
      this.setState(produce(this.state, (draft: AppState) => {
        draft.session = result.data
      }))
    } else {
      Modal.error({title: '获取当前登入状态异常', content: result.message})
    }
  }

  render() {
    return (
      <div className="app-root">
        <Layout>
          <AsyncAppSider state={this.state} update={this.update}/>
          <Layout>
            <AsyncAppHeader state={this.state} update={this.update}/>
            <Layout.Content className="app-content">
              {this.props.children}
            </Layout.Content>
            <AsyncAppFooter state={this.state} update={this.update}/>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App
