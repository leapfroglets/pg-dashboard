import React, {Component} from 'react';

class Insert extends Component{
  render(){
    console.log("insert",this.props.dbname,this.props.table);
    return(
      <div>
        INSERT!!
      </div>
    );
  }
}

export default Insert;