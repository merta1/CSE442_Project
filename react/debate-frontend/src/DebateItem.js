import React from 'react';
import App from './App';
import DebateWindow from './DebateWindow';

class DebateItem extends React.Component {  
    render() {
      return (
        <div onClick={() => this.props.changeView('DebateWindow',1)}>
          This is debate item.
        </div>
      );
    }
  }

  export default DebateItem;