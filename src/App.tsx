import * as React from 'react';
import './App.css';
import { Icon, Layout } from 'antd';
import { AdminSakura } from './components';

interface AppState {
  collapsed: boolean;
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  onCollapse = (collapsed: boolean, type: 'clickTrigger' | 'responsive') => {
    if (type === 'responsive') {
      this.setState({...this.state, collapsed});
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
    );
  }

}

export default App;
