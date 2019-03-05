import React from 'react';

import DebateItem from './DebateItem';

class DebateList extends React.Component { 
    handleViewChange = (view, url="#") => {
        this.props.changeView(view, url);            
    } 
    render() {
    //here is where we would do our fetch call to get data from spark on various debates
    var json = {
        "1":{"id":146,"debateName":"Do you think CSE is a good program?","createdDate":"Feb 18, 2019 1:00pm","activeUsers":5},
        "2":{"id":32546,"debateName":"Is AI Dangerous?","createdDate":"Feb 18, 2019 1:05pm","activeUsers":16},
        "3":{"id":72356,"debateName":"What do you think of pizza?","createdDate":"Feb 18, 2019 1:30pm","activeUsers":320},
        "4":{"id":5426788,"debateName":"Is this the best app ever created in the history of apps?","createdDate":"Feb 18, 2019 3:00pm","activeUsers":4}};
    
    var arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });
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
            {arr.map(item => <DebateItem changeView={this.handleViewChange} id={item.id} debateName={item.debateName} createdDate={item.createdDate} activeUsers={item.activeUsers} />)}
            </tbody>
        </table>
      );
    }
  }

  export default DebateList;