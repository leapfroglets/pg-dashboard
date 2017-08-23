import React, {Component} from 'react';

class Browse extends Component{
  componentWillMount(){
    let data ={
      query:"select * FROM information_schema.tables WHERE table_schema='public'",
      dbname:this.props.dbname
    };
    httpUtil.post(`http://localhost:4553/api/queries`,data).then(response => {
      console.log("items",response.data.reply.rows);
      this.setState({
        tabList:response.data.reply.rows,
        isLoaded:true
      })
    });
  }

  render(){
    console.log("browse",this.props.dbname,this.props.table);
    return(
      <div>
        BROWSE!!
      </div>
    );
  }
}

export default Browse;