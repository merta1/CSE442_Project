import React from 'react';

class DebateWindow extends React.Component {  
    render() {
      return (
        <div onClick={() => this.props.changeView('DebateList')}>
           Draw Debate Window for {this.props.debateid} here
        </div>
      );
    }
  }

  export default DebateWindow;