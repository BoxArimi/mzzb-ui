import * as React from 'react'
import { Layout } from 'antd'

import { AppContext, AppState } from '../../App'
import { CollapseType } from 'antd/lib/layout/Sider'
import produce from 'immer'

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
        sider
      </Layout.Sider>
    )
  }
}
