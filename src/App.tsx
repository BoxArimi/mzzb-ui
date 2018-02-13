import * as React from 'react';
import './App.css';
import { AdminSakura } from './components';

class App extends React.Component<{}, {}> {

  render() {
    return (
      <div className="App-root">
        <AdminSakura/>
      </div>
    );
  }
  
}

export default App;
