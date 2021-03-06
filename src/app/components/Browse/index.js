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
      primaryKey:null,
      changedValue:'',
      reply:'',
      error:''
    };
    this.retrieveResponse = this.retrieveResponse.bind(this);
  }
  retrieveResponse(props) {
    let pKeyData = {
      query:`select c.column_name, c.ordinal_position from information_schema.key_column_usage AS c left join information_schema.table_constraints AS t ON t.constraint_name = c.constraint_name WHERE t.table_name = '${props.table}' AND t.constraint_type = 'PRIMARY KEY'`,
      dbname:props.dbname
    }
    let tempPkeys=[];
    httpUtil.post(`http://localhost:4553/api/database/queries`, pKeyData)
    .then(response => {
      if(response.data.reply.rows[0]){
        response.data.reply.rows.map(pkey => {
          tempPkeys.push(pkey.column_name);
        })
        this.setState({
          primaryKey:tempPkeys
        })
      }
      else{
        this.setState({
          primaryKey:null
        })
      }
    })
    .then(resp => {
      let order = '';
      if(this.state.primaryKey){
        order = ` order by `
        this.state.primaryKey.map(pKey => {
          order = order +`${pKey},`
        })
        order=order.slice(0,order.length-1)
      }
      else{
        order='';
      }
      let data = {
        query: `select * FROM ${props.table}${order}`,
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
            changedValue:''
          });
        })
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
      isLoaded: false,
      reply:'',
      error:''
    });
    if (nextProps.table && nextProps.dbname) {
      this.retrieveResponse(nextProps);
    }
  }

  setCellNo(i){
    if(this.state.primaryKey){
      this.setState({
        cellNo:i
    })
    }
  }

  handleKeyPress(e,table,field_name,newValue,pKeyValues,pKeys){
    let condition ='';
    pKeys.map(pkey => {
      condition = condition + `${pkey}='${pKeyValues[pkey]}' and `  
    })
    let data = {
      query:`update ${table} set ${field_name}='${newValue}' where ${condition.slice(0,condition.length-5)}`,
      dbname: this.state.dbname
    }
    if(e.keyCode==13){
      httpUtil.post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          reply:response.data.reply,
          error:'',
          cellNo:null
        })
        this.retrieveResponse(this.props);
      })
      .catch(err => {
        this.setState({
          reply:'',
          error:err.response.data.error.message
        })
      })
    }
  }

  render() {
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
                let pKeyValues={};
                if(this.state.primaryKey){
                  this.state.primaryKey.map(pKey => {
                    pKeyValues[pKey] = entry[pKey];
                  })
                }
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
                              onChange={(e) => {
                                this.setState({
                                  changedValue:e.target.value
                                })
                              }}
                              onKeyDown={(e) => {
                                this.handleKeyPress(e,this.props.table,field.name,this.state.changedValue,pKeyValues,this.state.primaryKey)
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
          {this.state.reply}
          {this.state.error}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Browse;
