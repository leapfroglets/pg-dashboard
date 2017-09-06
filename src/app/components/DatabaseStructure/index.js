import React, {Component} from 'react';
import * as httpUtil from '../../httpUtil';
import  { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CreateTable from '../CreateTable';

class DatabaseStructure extends Component{
  constructor(){
    super();
    this.state = {
      tables:[],
      isLoaded:false,
      reply:'',
      error:'',
      dbname:''
    };
    this.retrieveResponse = this.retrieveResponse.bind(this);
  }

  retrieveResponse(props){
    let data = {
      query:`select * FROM information_schema.tables WHERE table_schema='public'`,
      dbname:props.dbname
    }
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          tables:response.data.reply.rows,
          isLoaded:true,
          dbname:props.dbname
        })
      })
  }
  componentWillMount(){
    if(this.props.dbname){
      this.retrieveResponse(this.props);
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      isLoaded:false
    })
    if(nextProps.dbname){
      this.retrieveResponse(nextProps);
    }
  }
  refreshStructure(){
    let data = {
      query:`select * FROM information_schema.tables WHERE table_schema='public'`,
      dbname:this.props.dbname
    }
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {
        this.setState({
          tables:response.data.reply.rows,
          isLoaded:true
        })
      })
  }

  dropTable(table_name){
    let data = {
      query:`drop table ${table_name}`,
      dbname:this.props.dbname
    };
    confirmAlert({
      title:'Confirm drop action',
      message:'Do you want to drop the table',
      confirmLabel:'drop',
      cancelLabel:'cancel',
      onConfirm:() => {
        httpUtil
        .post(`http://localhost:4553/api/database/queries`,data)
        .then(response => {
          this.setState({
            reply:response.data.reply,
            error:''
          })
        })
        .then(() => {
          this.props.refresh();
          this.refreshStructure();
        })
        .catch(err => {
          this.setState({
            reply:'',
            error:err.response.data.error.message
          })
        })
      },
      onCancel:() => {
        this.setState({
          reply:'drop action cancelled.'
        })
      }
    })
    
  }
  render(){
    if (this.state.isLoaded === true) {
      return (
        <div>
          <div className="title_left">
            <h3>Database: {this.props.dbname}</h3>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Table Name</td>
                <td> Action</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.tables.map(table => {
                  return(
                    <tr key={table.table_name}>
                      <td
                        onClick={() =>{
                          this.props.onClick(this.state.dbname,table.table_name);
                          this.props.history.push(`${this.props.match.url}/browse`);
                        }}
                        className="point"
                      >
                        {table.table_name}
                      </td>
                      <td><input type="button"  className="btn btn-round btn-sm btn-default" value="drop" onClick={() => {this.dropTable(table.table_name)}}/></td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          {this.state.reply}
          {this.state.error}
          <CreateTable dbname={this.props.dbname} refresh={() => this.props.refresh()} refreshStructure={() => {this.refreshStructure()}}/>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DatabaseStructure;