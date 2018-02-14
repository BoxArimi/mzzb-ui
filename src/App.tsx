import * as React from 'react'
import produce from 'immer'
import './App.css'

import { Layout, Modal, Popconfirm } from 'antd'
import { Icon } from './lib'

import { CollapseType } from 'antd/lib/layout/Sider'
import { loginManager, Result } from './utils/manager'
import * as Loadable from 'react-loadable'

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

const AsyncLoginModal = Loadable.Map({
  loading: () => null,
  loader: {
    Component: () => import('./components/login-modal'),
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

  onCollapse = (viewSider: boolean, type: CollapseType) => {
    if (type === 'responsive') {
      this.setState(produce(this.state, (draft: AppState) => {
        draft.viewSider = viewSider
      }))
    }
  }

  submitLogout = async () => {
    const result: Result<Session> = await loginManager.logout()
    if (result.success) {
      this.setState(produce(this.state, (draft: AppState) => {
        draft.session = result.data
      }))
    } else {
      Modal.error({title: '登出异常', content: result.message})
    }
  }

  showLogin = () => {
    this.setState(produce(this.state, (draft: AppState) => {
      draft.viewModal = true
    }))
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

    AsyncLoginModal.preload()
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
            <Layout.Header
              className="app-header"
            >
              <Icon
                className="header-icon"
                onClick={() => this.setState({...this.state, viewSider: !this.state.viewSider})}
                type={this.state.viewSider ? 'menu-unfold' : 'menu-fold'}
              />
              {this.state.session.isLogged ? (
                <Popconfirm
                  title="你确定要登出吗？"
                  placement="bottomRight"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={this.submitLogout}
                >
                  <Icon
                    className="header-icon float-right"
                    type="icon-user"
                  />
                </Popconfirm>
              ) : (
                <Icon
                  className="header-icon float-right"
                  type="icon-login"
                  onClick={this.showLogin}
                />
              )}
            </Layout.Header>
            <Layout.Content
              className="app-content"
            >
              {this.props.children}
            </Layout.Content>
            <Layout.Footer
              className="app-footer"
            >
              {this.state.viewModal && (
                <AsyncLoginModal
                  state={this.state}
                  update={(reducer) => this.setState(reducer(this.state))}
                />
              )}
            </Layout.Footer>
          </Layout>
        </Layout>
      </div>
    )
  }

}

export default App
