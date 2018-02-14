import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Layout, Modal } from 'antd'
import './App.css'

import { loginManager, Result } from './utils/manager'
import * as Loadable from 'react-loadable'
import produce from 'immer'

export interface Session {
  userName: string
  isLogged: boolean
  userRoles: string[]
}

export interface Reload {
  handle: () => void
  pending: boolean
}

export interface AppState {
  viewSider: boolean
  viewModal: boolean
  submiting: boolean
  session: Session
  reload?: Reload
}

const async = (loader: () => any) => {
  return Loadable({
    loader: loader,
    loading: () => null,
  })
}

const AsyncAppSider = async(() => import('./layouts/app-sider'))

const AsyncAppHeader = async(() => import('./layouts/app-header'))

const AsyncAppFooter = async(() => import('./layouts/app-footer'))

class App extends React.Component<{}, AppState> {

  static childContextTypes = {
    state: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
  }

  constructor(props: {}) {
    super(props)

    this.state = {
      viewSider: false,
      viewModal: false,
      submiting: false,
      session: {
        isLogged: false,
        userName: 'Guest',
        userRoles: [],
      },
    }
  }

  update = (reducer: (draft: AppState) => void) => {
    this.setState(produce(this.state, reducer))
  }

  getChildContext() {
    return {
      state: this.state,
      update: this.update,
    }
  }

  async componentDidMount() {
    const result: Result<Session> = await loginManager.check()
    this.update(draft => {
      if (result.success) {
        draft.session = result.data
      } else {
        Modal.error({title: '获取当前登入状态异常', content: result.message})
      }
    })
  }

  render() {
    return (
      <div className="app-root">
        <Layout>
          <AsyncAppSider/>
          <Layout>
            <AsyncAppHeader/>
            <Layout.Content className="app-content">
              {this.props.children}
            </Layout.Content>
            <AsyncAppFooter/>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App
