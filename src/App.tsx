import * as React from 'react';
import './App.css';
import { Manager, Model } from './utils/manager';

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
    return (
      <div className="App">
        {this.state.sakuras && (
          this.state.sakuras.map(sakura => (
            <div>{sakura.title}</div>
          ))
        )}
      </div>
    );
  }
}

export default App;
