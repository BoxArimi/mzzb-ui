import * as React from 'react'
import { Alert } from 'antd'
import Table, { Column } from '../../lib/table'
import './admin-user.css'

import { Manager, Model, Result } from '../../utils/manager'
import { AppState, default as App } from '../../App'
import produce from 'immer'

interface AdminUserModel extends Model {
  username: string
  enabled: boolean
  registerDate: string
  lastLoggedIn: string
}

interface AdminUserState {
  users?: AdminUserModel[]
  message?: string
}

const columns: Column<AdminUserModel>[] = [
  {key: 'id', title: '#', format: (t) => t.id},
  {key: 'username', title: '用户名', format: (t) => t.username},
  {key: 'enabled', title: '启用', format: (t) => t.enabled ? '是' : '否'},
  {key: 'registerDate', title: '注册时间', format: (t) => t.registerDate},
  {key: 'lastLoggedIn', title: '最后登入', format: (t) => t.lastLoggedIn},
]

export class AdminUser extends React.Component<{}, AdminUserState> {

  static contextTypes = App.childContextTypes

  manager: Manager<AdminUserModel> = new Manager('/api/admin/users')

  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  update = (reducer: (draft: AdminUserState) => void) => {
    this.setState((prevState => produce(prevState, reducer)))
  }

  listAdminUsers = async (): Promise<void> => {
    this.context.update((draft: AppState) => {
      draft.reload!.pending = true
    })

    const result: Result<AdminUserModel[]> = await this.manager.findAll()

    this.update(draft => {
      if (result.success) {
        draft.users = result.data
        draft.message = undefined
      } else {
        draft.message = result.message
      }
    })

    this.context.update((draft: AppState) => {
      draft.reload!.pending = false
    })
  }

  async componentDidMount() {
    this.context.update((draft: AppState) => {
      draft.reload = {pending: true, handle: this.listAdminUsers}
    })

    await this.listAdminUsers()
  }

  render() {
    return (
      <div className="admin-users">
        {this.state.message && (
          <Alert message={this.state.message} type="error"/>
        )}
        {this.state.users && (
          <Table title="用户列表" rows={this.state.users} columns={columns}/>
        )}
      </div>
    )
  }
}
