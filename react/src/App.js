import React from 'react';

import DebateList from './DebateList';
import DebateWindow from './DebateWindow';
import StartNewDebate from './StartNewDebate';
import Nav from './Nav';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import DebateChooseSide from './DebateChooseSide';

class App extends React.Component {
    constructor(props) {
        super(props);

        //set defaults
        this.state = {
            currentView: 'DebateList',
            debateid: '2',
            username: null,
            userid: null,
            email: null,
            sparkEndpoint: "http://localhost:4567"
        };

        //strip the anchor out of the URL, it will determine the view that is loaded if a page is refreshed
        let url = document.URL;
        let urlparts = url.split('#');
        if (urlparts[1] !== undefined) {
            let anchorparts = urlparts[1].split("/");
            if (anchorparts[1] !== undefined) {
                switch(anchorparts[1]) {
                    case "debate":
                        //debateid is only used on the DebateWindow page right now, it refers to a debate ID in the database
                        //currentView is used to change the view state of the React Application
                        this.state.currentView = 'DebateWindow';
                        this.state.debateid = anchorparts[2];
                        break;
                    case "new-debate":
                        this.state.currentView = 'StartNewDebate';
                        break;
                    case "register":
                        this.state.currentView = 'Register';
                        break;
                    case "forgotPassword":
                        this.state.currentView = 'ForgotPassword';
                        break;
                    case "resetPassword":
                        this.state.currentView = 'ResetPassword';
                        break;
                    default:
                        break;
                }
            }
        }

        let localSave = localStorage.getItem("debate");
        if (localSave !== "" && localSave !== null) {
            this.state.username = JSON.parse(localSave).username;
            this.state.email = JSON.parse(localSave).email;
            this.state.userid = JSON.parse(localSave).userid;
        }

        this.changeView = this.changeView.bind(this);
        this.setUserName = this.setUserName.bind(this);
      }
      //this changes the active view and the
      changeView(view, dbid="#") {
        this.setState({currentView: view, debateid: dbid })
      }
      setUserName(user) {
          this.setState({username: user})
      }
      drawView(state) {
        //this is a list of potential views.  We need to add new views here first!!!!
        var VIEWS = {
            DebateList: <DebateList changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />,
            DebateWindow: <DebateWindow changeView={this.changeView} debateid={state.debateid} username={this.state.username} userid={this.state.userid} sparkEndpoint={this.state.sparkEndpoint} />,
            StartNewDebate: <StartNewDebate changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />,
            Register: <Register changeView={this.changeView} setUserName={this.setUserName} debateid={state.debateid} sparkEndpoint={this.state.sparkEndpoint} />,
            ForgotPassword: <ForgotPassword changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />,
            ResetPassword: <ResetPassword changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />,
            DebateChooseSide: <DebateChooseSide changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} debateid={state.debateid} userid={this.state.userid} />
            }
        return VIEWS[state.currentView];
      }

    render() {
      return (
        <div className='container'>
            <Nav changeView={this.changeView} setUserName={this.setUserName} username={this.state.username} />
            {this.drawView(this.state)}

        </div>
      );
    }
  }

  export default App;
