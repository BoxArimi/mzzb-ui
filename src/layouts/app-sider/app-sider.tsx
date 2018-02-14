import * as React from 'react'
import { Layout, Menu } from 'antd'
import Icon from '../../lib/icon'

import { AppContext, AppState } from '../../App'
import { CollapseType } from 'antd/lib/layout/Sider'
import { default as routes, RouteInfo } from '../../common/routes'
import produce from 'immer'

const renderTitle = (route: RouteInfo) => {
  return (
    <span><Icon className="sider-icon" type={route.icon}/>{route.title}</span>
  )
}

const renderMenu = (route: RouteInfo, key: number): React.ReactNode => {
  return route.hasRoutes ? (
    <Menu.SubMenu key={key} title={renderTitle(route)}>
      {route.routes.map(renderMenu)}
    </Menu.SubMenu>
  ) : (
    <Menu.Item key={key}>
      {renderTitle(route)}
    </Menu.Item>
  )
}

export class AppSider extends React.Component<AppContext, {}> {

  onCollapse = (viewSider: boolean, type: CollapseType) => {
    if (type === 'responsive') {
      this.props.update(state => produce(state, (draft: AppState) => {
        draft.viewSider = viewSider
      }))
    }
  }

  render() {
    return (
      <Layout.Sider
        className="app-sider"
        collapsed={this.props.state.viewSider}
        onCollapse={this.onCollapse}
        collapsedWidth={0}
        breakpoint="md"
        trigger={null}
      >
        <div className="sider-logo">
          <h2>名作之壁</h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[document.location.pathname]}
          style={{height: '100%'}}
        >
          {routes.map(renderMenu)}
        </Menu>
      </Layout.Sider>
    )
  }
}
