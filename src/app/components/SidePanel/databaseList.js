import React, { Component } from 'react';
import DatabaseItem from './databaseItem';
import * as httpUtil from '../../httpUtil';
class DatabaseList extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      dbList: []
    };
    this.refreshDatabaseList = this.refreshDatabaseList.bind(this);
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
      })
      .then(() => {
        for (let i = 0; i < Object.keys(this.refs).length; i++)
          this.refs['child' + i].refreshDataItem();
      });
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
      });
  }

  // setActiveDb(id,listOfDb){
  //   let ele = document.getElementById(id);
  //   ele.style.borderLeft= '4px solid #03A9F4';
  //   listOfDb.map(db => {
  //     let ele2 = document.getElementById(db.datname+'_id')
  //     if(db.datname+'_id' != id){
  //       ele2.style.borderLeft= '4px solid rgba(0,0,0,0)';
  //     }
  //   })
    
  // }

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
                setActiveDb={(db_id,tb_id,listOfTb) => {this.props.setActiveDb(db_id,this.state.dbList,tb_id,listOfTb)}}
                history={this.props.history}
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
