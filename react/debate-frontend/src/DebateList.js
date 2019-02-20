import React from 'react';

import DebateItem from './DebateItem';
import App from './App';
import DebateWindow from './DebateWindow';

class DebateList extends React.Component {  
    render() {
      return (
        <div>
            This is a list of available debates.
          <DebateItem />
          <DebateItem />
          <DebateItem />
          <DebateItem />
          <DebateItem />
          <DebateItem />
          <DebateItem />
          <DebateItem />
          <DebateItem />
          <DebateItem />
        </div>
      );
    }
  }

  export default DebateList;