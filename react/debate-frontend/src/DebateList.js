import React from 'react';

import DebateItem from './DebateItem';

class DebateList extends React.Component { 
    handleViewChange = (view) => {
        this.props.changeView(view);            
    } 
    render() {
      return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Question</th>
                    <th scope="col">Participants</th>
                    <th scope="col">Date</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            <DebateItem changeView={this.handleViewChange}  />
            <DebateItem changeView={this.handleViewChange}  />
            <DebateItem changeView={this.handleViewChange}  />
            <DebateItem changeView={this.handleViewChange}  />
            <DebateItem changeView={this.handleViewChange}  />
            <DebateItem changeView={this.handleViewChange}  />
            <DebateItem changeView={this.handleViewChange}  />
            </tbody>
        </table>
      );
    }
  }

  export default DebateList;