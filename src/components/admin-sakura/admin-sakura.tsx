import * as React from 'react'
import './admin-sakura.css'
import { Column, Table } from '../../lib'
import { Manager, Model } from '../../utils/manager'
import produce from 'immer'

interface Sakura extends Model {
  key: string
  title: string
  enabled: boolean
  sakuraUpdateDate: number
}

interface AdminStateState {
  sakuras?: Sakura[]
  message?: string
}

const columns: Column<Sakura>[] = [
  {key: 'id', title: 'ID', format: (t) => t.id},
  {key: 'title', title: 'Title', format: (t) => t.title},
]

export class AdminSakura extends React.Component<{}, AdminStateState> {

  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  async componentDidMount() {
    const manager: Manager<Sakura> = new Manager('/api/sakuras')
    const result = await manager.findAll('discColumns=id,title')
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
        {this.state.sakuras && (
          <Table title="sakura list" rows={this.state.sakuras} columns={columns}/>
        )}
      </div>
    )
  }

}
