import React from 'react';

class DebateWindow extends React.Component {  
    render() {
      return (
        <div onClick={() => this.props.changeView('DebateList')}>
           Debate Window
        </div>
      );
    }
  }

  export default DebateWindow;