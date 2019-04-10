import React from 'react';
import CommentItem from './CommentItem';
import Error from './Error';
import LoadingOverlay from 'react-loading-overlay';

class DebateWindow extends React.Component {

    constructor(props) {
      super(props);
      if (props.username === undefined) {
        props.changeView('Register', props.debateid);
      }

      this.state = {
        json : {
          "agree" : {
            "comments":{},
          },
          "disagree" : {
            "comments":{},
          },
        },
        isLoading : true,
        comment : "",
        error : "",
        hasError : false
      };

    }

    componentDidMount() {
      this.interval = setInterval(() => 
      fetch(this.props.sparkEndpoint + "/debate/" + this.props.debateid)
        .then(res => res.json())
        .then(
          (result) => {
            console.log("JSON : " + result);
            this.setState({ json : result });
            this.setState({ isLoading : false });
          },
          (error) => {
            // TODO Implement Error handling.
            console.log("Error, couldn't connect to spark : " + error);
          }
        ), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    handleError = msg => {

      this.setState({error: msg});
      this.setState({hasError: true});
      
    }

    handleSubmit = type => event => {

      let self = this;

      let formBody = [];
      formBody.push("debateid=" + encodeURIComponent(self.props.debateid));
      formBody.push("comment=" + encodeURIComponent(self.state.comment));
      formBody.push("userid=" + encodeURIComponent(self.props.userid));
      formBody.push("side=" + encodeURIComponent(type));
      formBody = formBody.join("&");

      fetch(self.props.sparkEndpoint + "/comment", {
              method: 'post',
              headers: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              body: formBody,
      }).then(function(response) {
              return response.json();
      }).then(function(data) {
              if (data.status === "ok") {
                      //we don't have to do anything, the page will refresh automatically
              } else {
                      self.handleError(data.message);
              }
      }).catch(function(err) {
              console.log("Fetch Error: ",err);
      });

      event.preventDefault();
    }

    render() {
      var debateJson = this.state.json;

      // 2. If the debate is public

      // 2a. If the debate is "closed" then we just show the debate screen without comments

      // 2b. If the debate is "open" check if the user is logged in

          // 2b-1. If the user is logged in, check to see if they have chosen a side on this debate.

              // 2b-1-a. If they have chosen a side then show the comment box for the side they are on.

              // 2b-1-b.  If they haven't chosen a side, then change the window to the change side window.
              //          Pass something to this page so the system knows to return them to this page.

          // 2b-2. If the user is not logged in, send them to the register page to login.  Pass something so
          //       the system knows to return them to this page.

      // 3. If the debate is private

        // for now just do the same thing as private, we will eventually build this out with more permissions.


      
      

      // 4. We need to listen for comment submission.  If we get a comment, we should add it to the appropriate
      //    side of the debate in realtime so the user thinks it is realtime.  Then send the request to the correct
      //    api call.

      var arrAgree = [];
      Object.keys(debateJson.agree.comments).forEach(function(key) {
        arrAgree.push(debateJson.agree.comments[key]);
      });

      var arrDisagree = [];
      Object.keys(debateJson.disagree.comments).forEach(function(key) {
        arrDisagree.push(debateJson.disagree.comments[key]);
      });

      return (

        <LoadingOverlay 
          active={this.state.isLoading} 
          spinner 
          text='Loading...' 
          styles={{
            overlay: (base) => ({
              ...base,
              background: 'rgba(255, 255, 255, 1.0)'
            }),
            content: (base) => ({
              ...base,
              color: 'rgba(0, 0, 0, 1)',
              background: 'rgba(255, 255, 255, 1)'
            }),
            spinner: (base) => ({
              ...base,
              '& svg circle': {
                stroke: 'rgba(0, 0, 0, 1)'
              }
            })
        }}>
        <div className="container">
          { this.state.hasError ? <Error ErrorMessage={this.state.error} /> : null }
          <div className="row mb-4 mt-4">
            <h1>{debateJson.question} - #{this.props.debateid}</h1>
          </div>
          <div className="row">
            <div className="col">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col"><h2>{debateJson.agree.displaytext} - {debateJson.agree.usercount} Users</h2></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    arrAgree.map(item => <CommentItem changeView={this.handleViewChange}
                        id={item.id}
                        Comment={item.Comment}
                        UserID={item.UserID}
                        UserName={item.UserName}
                        />)
                  }
                  </tbody>
                </table>
                <form onSubmit={this.handleSubmit('A')} >
                  <div>
                      <textarea rows="2" cols="50" id="textAreaAgree" 
                        onChange={e=>this.setState({comment: e.target.value}) } 
                        value={this.state.comment} /><br></br>
                      <input className="btn btn-light" type="submit" value="Submit Comment" />
                  </div>
                </form>
            </div>
            <div className="col">
                <table className="table">
                  <thead className="thead-dark">
                      <tr>
                      <th scope="col"><h2>{debateJson.disagree.displaytext} - {debateJson.disagree.usercount} Users</h2></th>
                      </tr>
                  </thead>
                  <tbody>
                  {
                      arrDisagree.map(item => <CommentItem changeView={this.handleViewChange}
                        id={item.id}
                        Comment={item.Comment}
                        UserID={item.UserID}
                        UserName={item.UserName}
                          />)
                  }
                  </tbody>
                </table>
                <form onSubmit={this.handleSubmit('B')} >
                  <div>
                    <textarea rows="2" cols="50" id="textAreaDisagree" 
                      onChange={e=>this.setState({comment: e.target.value}) } 
                      value={this.state.comment} /><br></br>
                    <input className="btn btn-light" type="submit" value="Submit Comment" />
                  </div>
              </form>
            </div>
          </div>
        </div>
        </LoadingOverlay>
      );
    }
  }

  export default DebateWindow;
