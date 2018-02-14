import * as React from 'react'
import produce from 'immer'
import './App.css'

import { Input, Layout, Modal, Popconfirm } from 'antd'
import { Icon } from './lib'

import { CollapseType } from 'antd/lib/layout/Sider'
import { loginManager, Result } from './utils/manager'

interface Session {
  userName: string
  isLogged: boolean
  userRoles: string[]
}

interface AppState {
  viewSider: boolean
  viewModel: boolean
  submiting: boolean
  session: Session
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props)

    this.state = {
      viewSider: false,
      viewModel: false,
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
      draft.viewModel = true
    }))
  }

  submitLogin = async () => {
    const username = (document.querySelector('#login-username') as HTMLInputElement).value
    const password = (document.querySelector('#login-password') as HTMLInputElement).value

    if (!username || !password) {
      Modal.warning({title: '请检查输入项', content: '你必须输入用户名和密码'})
      return
    }

    this.setState(produce(this.state, (draft: AppState) => {
      draft.submiting = true
    }))

    const result: Result<Session> = await loginManager.login(username, password)
    this.setState(produce(this.state, (draft: AppState) => {
      if (result.success) {
        draft.session = result.data
        draft.submiting = false
        draft.viewModel = false
      } else {
        draft.submiting = false
        Modal.error({title: '登入异常', content: result.message})
      }
    }))
  }

  hideLogin = () => {
    this.setState(produce(this.state, (draft: AppState) => {
      draft.viewModel = false
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
              <Modal
                title="用户登入"
                okText="登入"
                cancelText="取消"
                visible={this.state.viewModel}
                confirmLoading={this.state.submiting}
                onOk={this.submitLogin}
                onCancel={this.hideLogin}
              >
                <Input
                  id="login-username"
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="请输入用户名"
                  onPressEnter={() => (document.querySelector('#login-password') as HTMLInputElement).focus()}
                />
                <Input
                  id="login-password"
                  type="password"
                  prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="请输入密码"
                  onPressEnter={this.submitLogin}
                />
              </Modal>
            </Layout.Footer>
          </Layout>
        </Layout>
      </div>
    )
  }

}

export default App
