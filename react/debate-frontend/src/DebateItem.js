import React from 'react';

class DebateItem extends React.Component {  
    render() {
        
      return (
        <tr>
            <th scope="row">This is a debate about school.</th>
            <td>13</td>
            <td>February 18, 2018</td>
            <td><div onClick={() => this.props.changeView('DebateWindow')}><a href="#">Join</a></div></td>
        </tr>
      );
    }
  }

  export default DebateItem;