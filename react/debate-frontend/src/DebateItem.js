import React from 'react';

class DebateItem extends React.Component {  
    render() {
        
      return (
        <tr>
            <th scope="row">{this.props.debateName}</th>
            <td>{this.props.activeUsers}</td>
            <td>{this.props.createdDate}</td>
            <td><div onClick={() => this.props.changeView('DebateWindow',this.props.id)}><a href={'#/debate/' + this.props.id}>Join</a></div></td>
        </tr>
      );
    }
  }

  export default DebateItem;