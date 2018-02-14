import * as React from 'react'
import { Alert } from 'antd'
import Table, { Column } from '../../lib/table'
import './admin-sakura.css'

import { Manager, Model, Result } from '../../utils/manager'
import produce from 'immer'
import { AppState } from '../../App'
import * as PropTypes from 'prop-types'

interface AdminSakuraModel extends Model {
  key: string
  title: string
  enabled: boolean
  sakuraUpdateDate: number
}

interface AdminStateState {
  sakuras?: AdminSakuraModel[]
  message?: string
}

const formatTime = (sakuraUpdateDate: number) => {
  const millis = new Date().getTime() - sakuraUpdateDate
  const minutes = Math.floor(millis / 60000)
  const hour = Math.floor(minutes / 60)
  const minute = Math.floor(minutes % 60)
  return `${hour}时${minute}分前`
}

const columns: Column<AdminSakuraModel>[] = [
  {key: 'id', title: '#', format: (t) => t.id},
  {key: 'key', title: 'Key', format: (t) => t.key},
  {key: 'title', title: '标题', format: (t) => t.title},
  {key: 'enabled', title: '启用', format: (t) => t.enabled ? '是' : '否'},
  {key: 'sakuraUpdateDate', title: '上次更新', format: (t) => formatTime(t.sakuraUpdateDate)},
]

export class AdminSakura extends React.Component<{}, AdminStateState> {

  static contextTypes = {
    update: PropTypes.func.isRequired,
  }

  manager: Manager<AdminSakuraModel> = new Manager('/api/admin/sakuras')

  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  listAdminSakuras = async (): Promise<void> => {
    this.context.update((state: AppState) => produce(state, (draft: AppState) => {
      draft.reload = {pending: true, handle: this.listAdminSakuras}
    }))

    const result: Result<AdminSakuraModel[]> = await this.manager.findAll()

    this.context.update((state: AppState) => produce(state, (draft: AppState) => {
      draft.reload!.pending = false
    }))

    this.setState(produce(this.state, (draft: AdminStateState) => {
      if (result.success) {
        draft.sakuras = result.data
      } else {
        draft.message = result.message
      }
    }))
  }

  async componentDidMount() {
    await this.listAdminSakuras()
  }

  render() {
    return (
      <div className="App">
        {this.state.message && (
          <Alert message={this.state.message} type="error"/>
        )}
        {this.state.sakuras && (
          <Table title="sakura list" rows={this.state.sakuras} columns={columns}/>
        )}
      </div>
    )
  }
}
