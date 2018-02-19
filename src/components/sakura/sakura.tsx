import * as React from 'react'
import { Column, Table } from '../../lib/table'
import './sakura.css'

import { Manager, Model } from '../../utils/manager'
import { AppContext, AppState, default as App } from '../../App'
import format from '../../utils/format'
import produce from 'immer'

interface DiscModel extends Model {
  thisRank: number
  prevRank: number
  totalPt: number
  title: string
}

interface SakuraModel extends Model {
  key: string
  title: string
  enabled: boolean
  sakuraUpdateDate: number
  discs: DiscModel[]
}

interface State {
  sakuras?: SakuraModel[]
  message?: string
}

export class Sakura extends React.Component {

  static contextTypes = App.childContextTypes

  context: AppContext

  state: State = {}

  manager = new Manager<SakuraModel>('/api/sakuras')

  columns: Column<DiscModel>[] = [
    {
      key: 'rank',
      title: 'Rank',
      format: (t) => `${format(t.thisRank, '****')}位/${format(t.prevRank, '****')}位`
    },
    {
      key: 'totalPt',
      title: 'TotalPt',
      format: (t) => `${t.totalPt} pt`
    },
    {
      key: 'title',
      title: 'Title',
      format: (t) => t.title
    },
  ]

  listSakura = async () => {
    this.context.update((draft: AppState) => {
      draft.reload!.pending = true
    })

    let query = 'discColumns=id,thisRank,prevRank,totalPt,title'
    const result = await this.manager.findAll(query)

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

  update = (reducer: (draft: State) => void) => {
    this.setState((prevState => produce(prevState, reducer)))
  }

  async componentDidMount() {
    this.context.update((draft: AppState) => {
      draft.reload = {pending: true, handle: this.listSakura}
    })

    await this.listSakura()
  }

  render() {
    return (
      <div className="sakura-root">
        {this.state.sakuras && this.state.sakuras.map(sakura => (
          <div key={sakura.id}>
            <Table title={sakura.title} rows={sakura.discs} columns={this.columns}/>
          </div>
        ))}
      </div>
    )
  }
}
