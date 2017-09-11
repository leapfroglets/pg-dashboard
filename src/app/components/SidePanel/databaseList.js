import React, { Component } from 'react';
import DatabaseItem from './databaseItem';
import * as httpUtil from '../../httpUtil';
class DatabaseList extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      dbList: [],
      activeDb:null,
      activeTb:null
    };
    this.refreshDatabaseList = this.refreshDatabaseList.bind(this);
    this.resetSign = this.resetSign.bind(this);
  }

  setActiveDbTb(db,tb){
    this.setState({
      activeDb:db,
      activeTb:tb
    })
  }
  refreshDatabaseList() {
    let data = {
      query:
        "select * FROM pg_database where datistemplate=false and datname!='postgres'",
      dbname: 'postgres'
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          dbList: response.data.reply.rows,
          isLoaded: true
        });
        this.props.setDblist(response.data.reply.rows);
      })
      .then(() => {
        for (let i = 0; i < Object.keys(this.refs).length; i++)
          this.refs['child' + i].refreshDataItem();
      });
  }
  
  resetSign(){
    for (let i = 0; i < Object.keys(this.refs).length; i++)
      this.refs['child' + i].resetSign();
  }

  componentWillMount() {
    let data = {
      query:
        "select * FROM pg_database where datistemplate=false and datname!='postgres'",
      dbname: 'postgres'
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          dbList: response.data.reply.rows,
          isLoaded: true
        });
        this.props.setDblist(response.data.reply.rows);
      });
  }

  render() {
    if (this.state.isLoaded === true) {
      return (
        <ul className="db-list clearfix">
          {this.state.dbList.map((dbInfo, i) => {
            return (
              <DatabaseItem
                ref={`child${i}`}
                dbname={dbInfo.datname}
                key={dbInfo.datname}
                onClick={(dbname, table) => {
                  this.props.onClick(dbname, table);
                }}
                history={this.props.history}
                setActiveDbTb={(db,tb) => {this.setActiveDbTb(db,tb)}}
                activeDb={this.state.activeDb}
                activeTb={this.state.activeTb}
              />
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default DatabaseList;
