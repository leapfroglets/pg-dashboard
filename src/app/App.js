import React, { Component } from 'react';
import SqlEditor from './components/SqlEditor';
// import DatabaseList from './components/DatabaseList/databaseList';

class App extends Component {
  
  render() {
    
    return (
      <div className="App">
        <SqlEditor />
        {/* <DatabaseList /> */}
      </div>
    );
  }
  
}

export default App;
