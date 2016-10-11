//Main.js
import React from 'react';
import { Link } from 'react-router';
require("../styles/style.scss");
require("../styles/codemirror.css");

//Other Needed Components
import FileTree from './FileTree';
import Code from './Code';
import FunctionWeb from './FunctionWeb';
import RepoSelector from './RepoSelector';

const Main = React.createClass({

  render (){
      // console.log('heres the current state \n', this.state)
    return(
      // Main Cointainer
      <div className="row">
        {/*Navbar Container*/}
        <div id="navbar" className="col-sm-12">
          {/*Branding*/}
          <div className="col-sm-1 row">
            <h3><Link to="/">helloCode.js</Link></h3>
          </div>
          {/*Repo Selector*/}
          <div className="col-sm-9">
            <RepoSelector {...this.props}/>
          </div>
          {/*Options Selector*/}
          <div className="col-sm-2">
            <a href="https://github.com/giocodes/hellocodebase/">
              <div id="navbar-github" className="navbar-item"></div>
            </a>
            <div id="navbar-share" className="navbar-item"></div>
            <div id="navbar-new" className="navbar-item"></div>
          </div>
        </div>

        {/*Panels Container*/}
        <div id="panels-container" className="col-sm-12">
          {/*File Tree Container col-sm-2 col-md-1 row*/ }
          <div id="fileTree" className="babies center">
              <FileTree {...this.props}/>
          </div>
          {/*Code Mirror Container col-sm-5 col-lg-4*/}
          <div id="code-container" className="hidepanel">
              <Code isPrimary={true} {...this.props}/>
              <Code isPrimary={false} {...this.props}/>
          </div>
          {/*Paper Container col-sm-5 col-md-6 col-lg-7*/}
          <div id="paper-container" className="hidepanel">
              <FunctionWeb {...this.props} />
          </div>
        </div>
      </div>
    )
  }
});

export default Main;
