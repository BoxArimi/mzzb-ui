import * as React from 'react'
import { Alert } from 'antd'
import Table, { Column } from '../../lib/table'
import './basic-sakura.css'

import { Manager, Model, Result } from '../../utils/manager'
import { AppState, default as App } from '../../App'
import produce from 'immer'

interface BasicSakuraModel extends Model {
  key: string
  title: string
  enabled: boolean
  sakuraUpdateDate: number
}

interface BasicSakuraState {
  sakuras?: BasicSakuraModel[]
  message?: string
}

const formatTime = (sakuraUpdateDate: number) => {
  const millis = new Date().getTime() - sakuraUpdateDate
  const minutes = Math.floor(millis / 60000)
  const hour = Math.floor(minutes / 60)
  const minute = Math.floor(minutes % 60)
  return `${hour}时${minute}分前`
}

const columns: Column<BasicSakuraModel>[] = [
  {key: 'id', title: '#', format: (t) => t.id},
  {key: 'key', title: 'Key', format: (t) => t.key},
  {key: 'title', title: '标题', format: (t) => t.title},
  {key: 'enabled', title: '启用', format: (t) => t.enabled ? '是' : '否'},
  {key: 'sakuraUpdateDate', title: '上次更新', format: (t) => formatTime(t.sakuraUpdateDate)},
]

export class BasicSakura extends React.Component<{}, BasicSakuraState> {

  static contextTypes = App.childContextTypes

  manager: Manager<BasicSakuraModel> = new Manager('/api/basic/sakuras')

  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  update = (reducer: (draft: BasicSakuraState) => void) => {
    this.setState((prevState => produce(prevState, reducer)))
  }

  listSakura = async (): Promise<void> => {
    this.context.update((draft: AppState) => {
      draft.reload!.pending = true
    })

    const result: Result<BasicSakuraModel[]> = await this.manager.findAll()

    this.update(draft => {
      if (result.success) {
        draft.sakuras = result.data
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
      draft.reload = {pending: true, handle: this.listSakura}
    })

    await this.listSakura()
  }

  render() {
    return (
      <div className="basic-sakura">
        {this.state.message && (
          <Alert message={this.state.message} type="error"/>
        )}
        {this.state.sakuras && (
          <Table title="sakura列表" rows={this.state.sakuras} columns={columns}/>
        )}
      </div>
    )
  }
}
