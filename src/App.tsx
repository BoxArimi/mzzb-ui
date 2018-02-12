import * as React from 'react';
import './App.css';
import { Manager, ManagerImpl } from './utils/manager';

const logo = require('./logo.svg');

interface Sakura {
  id: number;
  key: string;
  title: string;
  enabled: boolean;
  sakuraUpdateDate: number;
}

class App extends React.Component {

  componentDidMount() {
    const manager: Manager<Sakura[]> = new ManagerImpl('/api/sakuras');
    manager.findAll('discColumns=id,title').then(sakuras => {
      this.setState({sakuras: sakuras});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
