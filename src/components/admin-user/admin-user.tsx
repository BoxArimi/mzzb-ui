import * as React from 'react'
import { Alert, Button, Input, Modal, Tabs } from 'antd'
import Table, { Column } from '../../lib/table'
import Icon from '../../lib/icon'
import './admin-user.css'

import { Manager, md5Password, Model, Result } from '../../utils/manager'
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

  listAdminUsers = async () => {
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

  addAdminUser = async () => {
    const username = (document.querySelector('#add-username') as HTMLInputElement).value
    const password = (document.querySelector('#add-password') as HTMLInputElement).value

    if (!username || !password) {
      Modal.warning({title: '请检查输入项', content: '你必须输入用户名和密码'})
    } else {
      const encode = md5Password(username, password)
      const result = await this.manager.addOne({username, password: encode})

      if (result.success) {
        this.update(draft => {
          draft.users && draft.users.push(result.data)
        })
      } else {
        Modal.error({title: '添加用户错误', content: result.message})
      }
    }
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
        <Tabs>
          <Tabs.TabPane tab="用户列表" key="1">
            {this.state.message && (
              <Alert message={this.state.message} type="error"/>
            )}
            {this.state.users && (
              <Table rows={this.state.users} columns={columns}/>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="添加用户" key="2">
            <div style={{padding: 10}}>
              <Input
                id="add-username"
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="请输入用户名"
              />
            </div>
            <div style={{padding: 10}}>
              <Input
                id="add-password"
                type="password"
                prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="请输入密码"
              />
            </div>
            <div style={{padding: '5px 10px'}}>
              <Button type="primary" onClick={this.addAdminUser}>添加用户</Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
