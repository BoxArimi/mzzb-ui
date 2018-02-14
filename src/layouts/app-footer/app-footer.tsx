import * as React from 'react'
import { Input, Layout, Modal } from 'antd'
import Icon from '../../lib/icon'

import { AppContext, AppState, Session } from '../../App'
import { loginManager, Result } from '../../utils/manager'

export class AppFooter extends React.Component<AppContext, {}> {

  submitLogin = async () => {
    const username = (document.querySelector('#login-username') as HTMLInputElement).value
    const password = (document.querySelector('#login-password') as HTMLInputElement).value

    if (!username || !password) {
      Modal.warning({title: '请检查输入项', content: '你必须输入用户名和密码'})
      return
    }

    this.props.update((draft: AppState) => {
      draft.submiting = true
    })

    const result: Result<Session> = await loginManager.login(username, password)
    this.props.update((draft: AppState) => {
      if (result.success) {
        draft.session = result.data
        draft.submiting = false
        draft.viewModal = false
      } else {
        draft.submiting = false
        Modal.error({title: '登入异常', content: result.message})
      }
    })
  }

  hideLogin = () => {
    this.props.update((draft: AppState) => {
      draft.viewModal = false
    })
  }

  render() {
    return (
      <Layout.Footer className="app-footer">
        {this.props.state.viewModal && (
          <Modal
            title="用户登入"
            okText="登入"
            cancelText="取消"
            visible={this.props.state.viewModal}
            confirmLoading={this.props.state.submiting}
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
        )}
      </Layout.Footer>
    )
  }
}
