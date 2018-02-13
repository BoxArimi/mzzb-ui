import * as React from 'react';
import './AdminSakura.css';
import { Column, Table } from '../../lib';
import { Manager, Model } from '../../utils/manager';

interface Sakura extends Model {
  key: string;
  title: string;
  enabled: boolean;
  sakuraUpdateDate: number;
}

interface AdminStateState {
  sakuras?: Sakura[];
  message?: string;
}

const columns: Column<Sakura>[] = [
  {key: 'id', title: 'ID', format: (t) => t.id},
  {key: 'title', title: 'Title', format: (t) => t.title},
];

export class App extends React.Component<{}, AdminStateState> {

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
    return (
      <div className="App">
        {this.state.sakuras && (
          <Table title="sakura list" rows={this.state.sakuras} columns={columns}/>
        )}
      </div>
    );
  }

}
