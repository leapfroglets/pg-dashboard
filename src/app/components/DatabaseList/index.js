import React, {Component} from 'react';
import DatabaseList from './databaseList';
import './style.css';

class SidePanel extends Component{
  render(){
    return(
      <div className="col-md-3 left_col">
          <div className="left_col scroll-view">
            <div className="navbar nav_title" style={{border: 0}}>
              <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>Gentelella Alela!</span></a>
            </div>

            <div className="clearfix"></div>

            <br />

            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
              <div className="menu_section">
                <h3>General</h3>
                  <DatabaseList/>
              </div>
              
            </div>
          </div>
      </div>
    );
  }
}

export default SidePanel;