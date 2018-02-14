import * as React from 'react'
import { Layout, Modal, Popconfirm } from 'antd'
import Icon from '../../lib/icon'

import { AppContext, AppState, Session } from '../../App'
import { loginManager, Result } from '../../utils/manager'
import produce from 'immer'

export class AppHeader extends React.Component<AppContext, {}> {

  toggleSider = () => {
    this.props.update(state => produce(state, (draft: AppState) => {
      draft.viewSider = !state.viewSider
    }))
  }

  showLogin = () => {
    this.props.update(state => produce(state, (draft: AppState) => {
      draft.viewModal = true
    }))
  }

  submitLogout = async () => {
    const result: Result<Session> = await loginManager.logout()
    if (result.success) {
      this.props.update(state => produce(state, (draft: AppState) => {
        draft.session = result.data
      }))
    } else {
      Modal.error({title: '登出异常', content: result.message})
    }
  }

  render() {
    return (
      <Layout.Header className="app-header">
        <Icon
          className="header-icon"
          onClick={this.toggleSider}
          type={this.props.state.viewSider ? 'menu-unfold' : 'menu-fold'}
        />
        {this.props.state.session.isLogged ? (
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
    )
  }
}
