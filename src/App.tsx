import * as React from 'react';
import './App.css';
import { Manager, Model } from './utils/manager';
import Table, { Column } from './lib/Table';

interface Sakura extends Model {
  key: string;
  title: string;
  enabled: boolean;
  sakuraUpdateDate: number;
}

interface AppState {
  sakuras?: Sakura[];
  message?: string;
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const manager: Manager<Sakura> = new Manager('/api/sakuras');
    manager.findAll('discColumns=id,title').then(result => {
      if (result.success) {
        this.setState({sakuras: result.data});
      } else {
        this.setState({message: result.message});
      }
    });
  }

  render() {

    const columns: Column<Sakura>[] = [
      {key: 'id', title: 'ID', format: (t) => t.id},
      {key: 'title', title: 'Title', format: (t) => t.title},
    ];

    return (
      <div className="App">
        {this.state.sakuras && (
          <Table title="sakura list" rows={this.state.sakuras} columns={columns}/>
        )}
      </div>
    );
  }
}

export default App;
