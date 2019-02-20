import React from 'react';

import DebateList from './DebateList';
import DebateWindow from './DebateWindow';

class App extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
          currentView: 'DebateList',
        };
        this.changeCurrentView = (x) => {
            this.setState.currentView = x;
        };
      }
    render() {
      return (
        <div>
            {this.state.currentView === 'DebateList' ? (
                <DebateList />
            ) : ( <DebateWindow /> )}
        </div>
      );
    }
  }

  export default App;