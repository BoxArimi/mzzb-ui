import * as React from 'react'
import { Alert } from 'antd'
import Table, { Column } from '../../lib/table'
import './admin-sakura.css'

import { Manager, Model } from '../../utils/manager'
import produce from 'immer'

interface Sakura extends Model {
  id: number
  key: string
  title: string
  enabled: boolean
  sakuraUpdateDate: number
}

interface AdminStateState {
  sakuras?: Sakura[]
  message?: string
}

const formatTime = (sakuraUpdateDate: number) => {
  const millis = new Date().getTime() - sakuraUpdateDate
  const minutes = Math.floor(millis / 60000)
  const hour = Math.floor(minutes / 60)
  const minute = Math.floor(minutes % 60)
  return `${hour}时${minute}分前`
}

const columns: Column<Sakura>[] = [
  {key: 'id', title: '#', format: (t) => t.id},
  {key: 'key', title: 'Key', format: (t) => t.key},
  {key: 'title', title: '标题', format: (t) => t.title},
  {key: 'enabled', title: '启用', format: (t) => t.enabled ? '是' : '否'},
  {key: 'sakuraUpdateDate', title: '上次更新', format: (t) => formatTime(t.sakuraUpdateDate)},
]

export class AdminSakura extends React.Component<{}, AdminStateState> {

  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  async componentDidMount() {
    const manager: Manager<Sakura> = new Manager('/api/admin/sakuras')
    const result = await manager.findAll()
    this.setState(produce(this.state, (draft: AdminStateState) => {
      if (result.success) {
        draft.sakuras = result.data
      } else {
        draft.message = result.message
      }
    }))
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
