import * as React from 'react'
import './App.css'
import { AdminSakura } from './components'
import { Layout, Popconfirm } from 'antd'
import { Icon } from './lib'

interface AppState {
  collapsed: boolean
  isLogged: boolean
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props)

    this.state = {
      collapsed: false, isLogged: false
    }
  }

  onCollapse = (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {
    if (type === 'responsive') {
      this.setState({...this.state, collapsed})
    }
  }

  render() {
    return (
      <div className="app-root">
        <Layout>
          <Layout.Sider
            className="app-sider"
            collapsed={this.state.collapsed}
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
                onClick={() => this.setState({...this.state, collapsed: !this.state.collapsed})}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              />
              {this.state.isLogged ? (
                <Popconfirm
                  title="你确定要登出吗？"
                  placement="bottomRight"
                  okText="Yes"
                  cancelText="No"
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
              footer
            </Layout.Footer>
          </Layout>
        </Layout>
      </div>
    )
  }

}

export default App
