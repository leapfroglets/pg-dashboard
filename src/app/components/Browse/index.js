import React, {Component} from 'react';
import * as httpUtil from '../../httpUtil';

class Browse extends Component{
  constructor(){
    super();
    this.state = {
      entries:[],
      isLoaded:false
    };
    this.retrieveResponse = this.retrieveResponse.bind(this);
  }

  retrieveResponse(props){
    let data ={
      query:"select * FROM "+props.table,
      dbname:props.dbname
    };
    httpUtil.post(`http://localhost:4553/api/queries`,data).then(response => {
      console.log("response",response.data.reply);
      this.setState({
        entries:response.data.reply,
        isLoaded:true
      })
    });
  }
  
  componentWillMount(){
    this.retrieveResponse(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.retrieveResponse(nextProps);
  }

  render(){
    console.log("browse",this.props.dbname,this.props.table);
    if(this.state.isLoaded === true){
      return(
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                {
                  this.state.entries.fields.map(field => {
                    return(
                      <th key={field.name}>{field.name}</th>
                    );
                  })
                }
              </tr>
            </thead>
            <tbody>
            
            {
              this.state.entries.rows.map((entry,i) => {
                return(
                  <tr key={i}>
                    {
                      this.state.entries.fields.map((field,i) => {
                        return(
                          <td key ={i}>{entry[field.name]}</td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
    );
    }
    else{return null;}
  }
}

export default Browse;