import * as React from 'react'
import './App.css'
import { AdminSakura } from './components'
import { Input, Layout, Modal, Popconfirm } from 'antd'
import { CollapseType } from 'antd/lib/layout/Sider'
import { Icon } from './lib'
import { loginManager } from './utils/manager'

interface AppState {
  viewSider: boolean
  viewModel: boolean
  submiting: boolean
  isLogged: boolean
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props)

    this.state = {
      viewSider: false,
      viewModel: false,
      submiting: false,
      isLogged: false,
    }
  }

  onCollapse = (viewSider: boolean, type: CollapseType) => {
    if (type === 'responsive') {
      this.setState({...this.state, viewSider})
    }
  }

  submitLogout = () => {
    loginManager.logout()
      .then(json => {
        this.setState({...this.state, isLogged: false})
      })
  }

  showLogin = () => {
    this.setState({...this.state, viewModel: true})
  }

  submitLogin = () => {
    const username = (document.querySelector('#login-username') as HTMLInputElement).value
    const password = (document.querySelector('#login-password') as HTMLInputElement).value

    if (!username || !password) {
      Modal.warning({title: '请检查输入项', content: '你必须输入用户名和密码'})
    } else {
      this.setState({...this.state, submiting: true})
      loginManager.login(username, password)
        .then(json => {
          if (json.success) {
            this.setState((prevState, props) => {
              return {...prevState, isLogged: true}
            })
          } else {
            this.setState((prevState, props) => {
              return {...prevState, isLogged: false}
            })
          }
          this.setState((prevState, props) => {
            return {...prevState, submiting: false, viewModel: false}
          })
        })
    }

  }

  hideLogin = () => {
    this.setState({...this.state, viewModel: false})
  }

  componentDidMount() {
    loginManager.check()
      .then(json => {
        this.setState({...this.state, isLogged: json.success})
      })
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
              {this.state.isLogged ? (
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
              <AdminSakura/>
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
