import React, { Component } from 'react';
import SqlEditor from './components/SqlEditor';
import SidePanel from './components/SidePanel';
import NavBar from './components/NavBar';
import NavBreadCrumb from './components/NavBreadCrumb';
import * as httpUtil from './httpUtil';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currDbname: null,
      currTable: null
    };
  }

  handleClick(dbName, table) {
    this.setState({
      currDbname: dbName,
      currTable: table
    });
  }

  setActiveDb(db_id,listOfDb,tb_id,listOfTb){
    if(db_id===null){
      listOfDb.map(db => {
        let ele3 = document.getElementById(db.datname+'_id')
        ele3.style.borderLeft= '4px solid rgba(0,0,0,0)';
        ele3.style.background='none';
        let ul=ele3.getElementsByTagName("UL");
        let li=ul[0].getElementsByTagName("LI");
        // console.log(li);
        for(let key in li){
          if(key.slice(key.length-3,key.length)==="_id"){
            li[key].style.background='none';
          }
        }
      })
    }
    else{
      let ele = document.getElementById(db_id);
      ele.style.borderLeft= '4px solid #03A9F4';
      ele.style.background='rgba(0,0,0,0.2)';
      listOfDb.map(db => {
        let ele2 = document.getElementById(db.datname+'_id')
        if(db.datname+'_id' != db_id){
          ele2.style.borderLeft= '4px solid rgba(0,0,0,0)';
          ele2.style.background='none';
          let ul2=ele2.getElementsByTagName("UL");
          let li2=ul2[0].getElementsByTagName("LI");
          for(let key in li2){
            if(key.slice(key.length-3,key.length)==="_id"){
              li2[key].style.background='none';
            }
          }
        }
      })
    
      if(tb_id){
        let ele4= document.getElementById(tb_id);
        ele4.style.background='rgba(0,0,0,0.2)';
        listOfTb.map(tb => {
          let ele5 = document.getElementById(tb.table_name+'_id')
          if(tb.table_name+'_id' != tb_id){
            ele5.style.background='none'
          }
        })
      }
    }
  }

  // setActiveTb(id,listOfDb){
    
  // }

  render() {
    return (
      <div className="App">
        <div className="col-md-2 left-container">
          <SidePanel
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            setActiveDb={(db_id,listOfDb,tb_id,listOfTb) => {this.setActiveDb(db_id,listOfDb,tb_id,listOfTb)}}
            ref="side"
            history={this.props.obj.history}
          />
        </div>
        <div className="col-md-10 right-container">
          <NavBreadCrumb
            currDbname={this.state.currDbname}
            currTable={this.state.currTable}
            match={this.props.obj.match}
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            history={this.props.obj.history}
          />
          <NavBar
            currDbname={this.state.currDbname}
            currTable={this.state.currTable}
            match={this.props.obj.match}
            refresh={() => this.refs.side.refreshSidePanel()}
            onClick={(dbname, table) => {
              this.handleClick(dbname, table);
            }}
            setActiveDb={(db_id,listOfDb) => {this.setActiveDb(db_id,listOfDb,null,null)}}
            history={this.props.obj.history}
          />
        </div>
      </div>
    );
  }
}

export default App;
