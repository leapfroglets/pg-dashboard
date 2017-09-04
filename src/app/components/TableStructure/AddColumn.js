import React, { Component } from 'react';
import * as httpUtil from '../../httpUtil';
class AddColumn extends Component {
  constructor() {
    super();
    this.state = {
      errorMsg: '',
      colLengthVisible:true
    };
    this.addColumn = this.addColumn.bind(this);
    this.checkDataType=this.checkDataType.bind(this);
  }
  checkDataType(e){
    console.log(e.target.value);
    let colLength=document.getElementById('tbLength');
    if(e.target.value==='int'){      
      colLength.value='';
      this.setState({colLengthVisible:false});
    }
    else{
      this.setState({colLengthVisible:true});
    }
  }
  addColumn() {
    let colName = document.getElementById('tbName').value;
    let colType = document.getElementById('ddDatatype').value;
    let colNull = document.getElementById('ddIsNull').value;
    let colLength='';
    if(this.state.colLengthVisible) 
      colLength = document.getElementById('tbLength').value;
    if (colName.trim() === '') {
      this.setState({ errorMsg: 'Please specific the column Name' });
      return;
    }

    if (colNull === 'NO') colNull = 'not null';
    else colNull = '';
    if(this.state.colLengthVisible)
    if (colLength.trim() !== '') 
      colLength = `(${colLength})`;
    this.setState({ errorMsg: '' });
    console.log(
      `alter table ${this.props
        .currTable} add column ${colName} ${colType}${colLength} ${colNull}`
    );
    let data = {
      query: `alter table ${this.props
        .currTable} add column ${colName} ${colType}${colLength} ${colNull}`,
      dbname: this.props.currDbname
    };
    httpUtil
      .post(`http://localhost:4553/api/database/queries`, data)
      .then(response => {})
      .then(this.props.refreshData());

    this.props.setShowAdd(false);
  }
  render() {
    return (
      <div className="x_panel">
        <h2>Add Column</h2>
        {this.state.errorMsg}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Is_Nullable</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  className="form-control text-input"
                  type="text"
                  placeholder="Name"
                  id="tbName"
                />
              </td>
              <td>
                <select className="form-control" id="ddDatatype" onChange={(e)=>this.checkDataType(e)}>
                  <option value="varchar">varchar</option>
                  <option value="int">int</option>
                  <option value="float">float</option>
                </select>
              </td>
              <td>
                <select className="form-control" id="ddIsNull">
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </td>
              {this.state.colLengthVisible &&
              <td>
                <input
                  className="form-control text-input"
                  placeholder="Length"
                  id="tbLength"
                />
              </td>}
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-round btn-default"
          onClick={() => this.addColumn()}
        >
          Add
        </button>
      </div>
    );
  }
}
export default AddColumn;
