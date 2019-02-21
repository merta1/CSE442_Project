import React from 'react';

import DebateItem from './DebateItem';
import App from './App';
import DebateWindow from './DebateWindow';

class DebateList extends React.Component { 
    handleViewChange = (view) => {
        this.props.changeView(view);            
    } 
    render() {
      return (
        <div>
            This is a list of available debates.
          <DebateItem changeView={this.handleViewChange}  />
          <DebateItem changeView={this.handleViewChange}  />
          <DebateItem changeView={this.handleViewChange}  />
          <DebateItem changeView={this.handleViewChange}  />
          <DebateItem changeView={this.handleViewChange}  />
          <DebateItem changeView={this.handleViewChange}  />
          <DebateItem changeView={this.handleViewChange}  />
        </div>
      );
    }
  }

  export default DebateList;