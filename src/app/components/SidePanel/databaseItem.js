import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';

class DatabaseItem extends Component {
  constructor() {
    super();
    this.state = {
      tabList: [],
      plusIsNext: true,
      isLoaded: false,
      activeDb:null,
      activeTb:null
    };
    this.refreshDataItem = this.refreshDataItem.bind(this);
    this.resetSign=this.resetSign.bind(this);
  }
  refreshDataItem() {
    let data = {
      query:
        "select * FROM information_schema.tables WHERE table_schema='public'",
      dbname: this.props.dbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          tabList: response.data.reply.rows,
          isLoaded: true
        });
      });
  }
  
  resetSign(){
    this.setState({
      plusIsNext:true
    })
  }
  componentWillMount() {
    let data = {
      query:
        "select * FROM information_schema.tables WHERE table_schema='public'",
      dbname: this.props.dbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          tabList: response.data.reply.rows,
          isLoaded: true,
          activeDb:this.props.activeDb,
          activeTb:this.props.activeTb
        });
      });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      activeDb:nextProps.activeDb,
      activeTb:nextProps.activeTb
    })
  }

  showTables() {
    let element = document.getElementById(this.props.dbname+"_tblist");
    if (this.state.plusIsNext) {
      element.style.display = 'block';
      this.setState({
        plusIsNext: false
      });
    } else {
      element.style.display = 'none';
      this.setState({
        plusIsNext: true
      });
    }
  }
  redirect(path) {
    this.props.history.push(path);
  }

  render() {
    console.log(this.props.activeDb);
    if (this.state.isLoaded === true) {
      let sign = this.state.plusIsNext ? '+' : '-';
      return (
        <li 
          className={(this.state.activeDb===this.props.dbname) ?
            "clearfix active-db":"clearfix not-active-db"
          } 
          key={this.props.dbname} 
          id={this.props.dbname+"_id"}
        >
          <span className="button-wrapper">
            <button
              className="sign-button"
              onClick={() => {
                this.showTables();
              }}
            >
              {sign}
            </button>
          </span>
          <span 
            className="dbname-wrapper point"
            onClick={() => {
              this.props.onClick(this.props.dbname, null);
              this.props.setActiveDbTb(this.props.dbname, null);
              this.redirect('/dashboard/databasestructure');
            }}
          >
            <i className="fa fa-database db-icon" />
            {this.props.dbname}
          </span>
          <ul className="table-list" id={this.props.dbname+"_tblist"}>
            {this.state.tabList.map(table => {
              return (
                <li
                  className={(this.state.activeTb===table.table_name && this.state.activeDb===this.props.dbname) ?
                    "point active-tb":"point not-active-tb"
                  }
                  key={table.table_name}
                  id={table.table_name+"_id"}
                  onClick={() => {
                    this.props.onClick(this.props.dbname, table.table_name);
                    this.props.setActiveDbTb(this.props.dbname, table.table_name);
                    this.redirect("/dashboard/browse");
                  }}
                >
                    {table.table_name}
                </li>
              );
            })}
          </ul>
        </li>
      );
    } else {
      return null;
    }
  }
}

export default DatabaseItem;
