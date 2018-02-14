import * as React from 'react'
import { Modal, Popconfirm } from 'antd'
import { Icon } from '../../lib'

import { AppContext, AppState, Session } from '../../App'
import { loginManager, Result } from '../../utils/manager'
import produce from 'immer'

export class ConfirmLogout extends React.Component<AppContext, {}> {

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
    )
  }
}
