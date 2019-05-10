import React from 'react';

import DebateList from './DebateList';
import DebateWindow from './DebateWindow';
import StartNewDebate from './StartNewDebate';
import Nav from './Nav';
import Register from './Register';

class App extends React.Component {
    constructor(props) {
        super(props);

        //set defaults
        this.state = {
            currentdebateview  : 'recent',
            currentView: 'DebateList',
            debateid: '2',
            username: null,
            userid: null,
            email: null,
<<<<<<< Updated upstream
            debateCurrentView :'Default',
            sparkEndpoint: "http://localhost:4567"
=======
            sparkEndpoint: "https://api.davidadkins.com"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      }
      drawView(state) {
        //this is a list of potential views.  We need to add new views here first!!!!
        var VIEWS = {
            DebateList: <DebateList changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />,
            DebateWindow: <DebateWindow changeView={this.changeView} debateid={state.debateid} username={this.state.username} userid={this.state.userid} sparkEndpoint={this.state.sparkEndpoint} debateCurrentView={this.state.debatecurrentView} />,
            StartNewDebate: <StartNewDebate changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />,
            Register: <Register changeView={this.changeView} setUserName={this.setUserName} debateid={state.debateid} sparkEndpoint={this.state.sparkEndpoint} />,
=======
          if (user === null) {
              this.setUserID(null);
          }
      }

      setCurrentDebateView(view)
      {
          this.setState({currentdebateview : view })
      }
      setUserID(id) {
        this.setState({userid: id})
      }
      drawView(state) {
        //this is a list of potential views.  We need to add new views here first!!!!
        var VIEWS = 
        {
            DebateList: <DebateList changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} currentView={this.state.currentdebateview} />,
            DebateWindow: <DebateWindow changeView={this.changeView} debateid={this.state.debateid} username={this.state.username} userid={this.state.userid} sparkEndpoint={this.state.sparkEndpoint} />,
            StartNewDebate: <StartNewDebate changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} userID={this.state.userid} />,
            Register: <Register changeView={this.changeView} lastDebateID={this.state.lastDebateID} lastView={this.state.lastView} setUserName={this.setUserName} setUserID={this.setUserID} debateid={this.state.debateid} sparkEndpoint={this.state.sparkEndpoint} />,
            ForgotPassword: <ForgotPassword changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />,
            ResetPassword: <ResetPassword changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />,
            DebateChooseSide: <DebateChooseSide changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} debateid={this.state.debateid} userid={this.state.userid} />,
            Activate: <Activate changeView={this.changeView} sparkEndpoint={this.state.sparkEndpoint} />
>>>>>>> Stashed changes
            }
        return VIEWS[state.currentView];
      }

    render() {
      return (
<<<<<<< Updated upstream
        <div className='container'>
            <Nav changeView={this.changeView} setUserName={this.setUserName} username={this.state.username} />
            {this.drawView(this.state)}

        </div>
=======
        <>
            <Nav changeView={this.changeView} setUserName={this.setUserName} username={this.state.username} changeDebateView={this.setCurrentDebateView} />
            <div className="container">
                {this.drawView(this.state)}
            </div>
        </>
>>>>>>> Stashed changes
      );
    }
  }

  export default App;
