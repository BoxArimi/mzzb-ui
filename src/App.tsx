import * as React from 'react'
import { Layout, Modal } from 'antd'
import './App.css'

import { CollapseType } from 'antd/lib/layout/Sider'
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

const AsyncAppHeader = Loadable.Map({
  loading: () => null,
  loader: {
    Component: () => import('./layouts/app-header'),
  },
  render(loaded: any, props: AppContext) {
    const Component = loaded.Component.default
    return <Component {...props} />
  }
})

const AsyncAppFooter = Loadable.Map({
  loading: () => null,
  loader: {
    Component: () => import('./layouts/app-footer'),
  },
  render(loaded: any, props: AppContext) {
    const Component = loaded.Component.default
    return <Component {...props} />
  }
})

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

  onCollapse = (viewSider: boolean, type: CollapseType) => {
    if (type === 'responsive') {
      this.setState(produce(this.state, (draft: AppState) => {
        draft.viewSider = viewSider
      }))
    }
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
          <Layout.Sider
            className="app-sider"
            collapsed={this.state.viewSider}
            onCollapse={this.onCollapse}
            collapsedWidth={0}
            breakpoint="md"
            trigger={null}
          >
            sider
          </Layout.Sider>
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
