import React, { Component } from 'react';
import SqlEditor from './components/SqlEditor';
import SidePanel from './components/DatabaseList';
import NavBar from './components/NavBar';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currDbname:'',
      currTable:''
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(dbName, table){
    console.log(dbName,table);
    this.setState({
      currDbname:dbName,
      currTable:table
    })
  }
  render() {
    return (
      <div className="App">
        {/* <SqlEditor /> */}
        <div className = "left_container clearfix">
          <SidePanel onClick={(dbname,table) => {this.handleClick(dbname,table)}}/>
        </div>
        <div className = "right_container clearfix"><NavBar/></div>
      </div>
    );
  }
  
}

export default App;
