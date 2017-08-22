import React, { Component } from 'react';
import SqlEditor from './components/SqlEditor';
import SidePanel from './components/DatabaseList';

class App extends Component {
  
  render() {
    
    return (
      <div className="App">
        <SqlEditor />
        <SidePanel />
      </div>
    );
  }
  
}

export default App;
