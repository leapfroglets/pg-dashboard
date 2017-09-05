import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';

class Browse extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      isLoaded: false,
      cellNo:null,
      dbname:'',
      primaryKey:'',
      changedValue:''
    };
    this.retrieveResponse = this.retrieveResponse.bind(this);
  }
  retrieveResponse(props) {
    let data = {
      query: 'select * FROM ' + props.table,
      dbname: props.dbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          entries: response.data.reply,
          isLoaded: true,
          dbname:props.dbname,
          cellNo:null,
          primaryKey:'',
          changedValue:''
        });
      })
      .then(response => {
        this.getPrimaryKeyName(props.table);
      })
  }

  componentWillMount() {
    this.setState({
      entries: []
    });
    if (this.props.table && this.props.dbname) {
      this.retrieveResponse(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      entries: [],
      isLoaded: false
    });
    if (nextProps.table && nextProps.dbname) {
      this.retrieveResponse(nextProps);
    }
  }

  setCellNo(i){
    if(this.state.primaryKey!==''){
      this.setState({
        cellNo:i
    })
    }
  }

  getPrimaryKeyName(table){
    let data = {
      query:`select c.column_name, c.ordinal_position from information_schema.key_column_usage AS c left join information_schema.table_constraints AS t ON t.constraint_name = c.constraint_name WHERE t.table_name = '${table}' AND t.constraint_type = 'PRIMARY KEY'`,
      dbname:this.state.dbname
    }
    httpUtil.post(`http://localhost:4553/api/database/queries`, data).then(response => {
      if(response.data.reply.rows[0]){
        this.setState({
          primaryKey:response.data.reply.rows[0].column_name
        })
      }
    })
  }
  handleKeyPress(e,table,field_name,value,newValue){
    let data = {
      query:`update ${table} set ${field_name}='${newValue}' where ${this.state.primaryKey}='${value}'`,
      dbname: this.state.dbname
    }
    if(e.keyCode==13){
      console.log(data.query)
      httpUtil.post(`http://localhost:4553/api/database/queries`, data).then(response => {
        this.setState({
          cellNo:null
        })
        this.retrieveResponse(this.props);
      })
    }
  }

  render() {
    console.log(this.state.primaryKey);
    if (this.state.isLoaded === true) {
      return (
        <div>
          <div className="title_left">
            <h3>Table: {this.props.table}</h3>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                {this.state.entries.fields.map(field => {
                  return <th key={field.name}>{field.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {this.state.entries.rows.map((entry, i) => {
                return (
                  <tr key={i}>
                    {this.state.entries.fields.map((field, j) => {
                      let temp = i.toString()+j.toString()
                      return(
                        <td
                          key={j}
                          onDoubleClick={() => {this.setCellNo(temp)}} 
                        >
                          {(this.state.cellNo===temp) ?
                            <input
                              type='text'
                              value={this.state.changedValue}
                              onChange={(e) => {this.setState({changedValue:e.target.value})}}
                              onKeyDown={(e) => {
                                this.handleKeyPress(e,this.props.table,field.name,entry[this.state.primaryKey],this.state.changedValue)
                              }}
                            /> :
                            entry[field.name]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Browse;
