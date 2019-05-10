import React from 'react';
import CommentItem from './CommentItem';
import Error from './Error';
import LoadingOverlay from 'react-loading-overlay';
import ScrollToBottom from 'react-scroll-to-bottom';

const debateColStyle = {
  'overflow-x':'hidden',
};

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
        arrAgree : [],
        arrDisagree : [],
        isLoading : true,
        comment : "",
        error : "",
        hasError : false,
        update: false,
        side: "N",
      };

      this.handleSubmit = this.handleSubmit.bind(this);

      this.myRef = React.createRef();

    }

    componentDidMount() {

      // i don't live this code and wish it was better

      if (window.innerWidth > 400) {  //if desktop

        var commentHeight = window.innerHeight - 290 -
        this.commentBoxA.clientHeight - 
        this.commentBoxB.clientHeight -
        this.debateTitle.clientHeight -
        this.debateHeading.clientHeight;

        var cols = document.getElementsByClassName('debate-window'); // ReactDOM.findDOMNode('DebateWindow').getElementsByClassName('debate-window');
        for(let i = 0; i < cols.length; i++) {
          cols[i].style.height = commentHeight + "px";
        }

        this.debateWindow.style.height = commentHeight;

      }

      if (this.props.userid !== null) {
        fetch(this.props.sparkEndpoint + "/user/getpreference/" + this.props.userid + "/"+ this.props.debateid)
          .then(res => res.json())
          .then(
            (result) => {
              if (result.message === "N") {
                this.props.changeView("DebateChooseSide", this.props.debateid);
              } else {
                this.setState({ side:result.message });
              }
            },
            (error) => {
              // TODO Implement Error handling.
              console.log("Error, couldn't connect to spark : " + error);
            }
          );
      }

      this.interval = setInterval(() =>
      fetch(this.props.sparkEndpoint + "/debate/" + this.props.debateid)
        .then(res => res.json())
        .then(
          (result) => {
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

    onEnterPress = type => event => {
      if(event.keyCode === 13 && event.shiftKey === false) {
        event.preventDefault();
        this.myRef.current.click();
      }
    }

    handleSubmit = type => event => {

      let self = this;

      let currentdate = new Date();
      let datetime = currentdate.getFullYear() + "-"+currentdate.getMonth() + "/" + currentdate.getDay() + " " 
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

      let comment = {
        "Comment":self.state.comment,
        "CommentTime":datetime,
        "UserName":self.props.username,
        "UserId":self.props.userid
      };

      let newJson = self.state.json;
      if (type === "A") {
        newJson.agree.comments[2000000] = comment;
      } else {
        newJson.disagree.comments[2000000] = comment;
      }
      this.setState({json: newJson});

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
                self.setState({ comment : "" });
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
        <div className="container" ref={ (debateWindow) => this.debateWindow = debateWindow}>
          { this.state.hasError ? <Error ErrorMessage={this.state.error} /> : null }
          <div className="row ml-2 mb-4 mt-4" ref={ (debateTitle) => this.debateTitle = debateTitle}>
            <h2>{debateJson.question}</h2>
          </div>
          <div className="row">
            <div className="col" style={debateColStyle}>
              <div className="bg-dark p-2" ref={ (debateHeading) => this.debateHeading = debateHeading}>
                <h5 className="text-light">{debateJson.agree.displaytext} - {debateJson.agree.usercount} Users</h5>
              </div>
              <ScrollToBottom className="debate-window">
              {
                arrAgree.map((item, index) => <CommentItem changeView={this.handleViewChange}
                    id={index}
                    key={"A"+index}
                    Comment={item.Comment}
                    UserID={item.UserID}
                    UserName={item.UserName}
                    />)
              }
              </ScrollToBottom>

              {this.state.side==="A" && this.props.userid !== null?
                <form onSubmit={this.handleSubmit('A')}>
                <div ref={ (commentBoxA) => this.commentBoxA = commentBoxA}>
                    <textarea className="form-control" rows="1" id="textAreaAgree"
                      onChange={e=>this.setState({comment: e.target.value}) }
                      value={this.state.comment} onKeyDown={this.onEnterPress('A')} /><br></br>
                    <input className="btn btn-light" type="submit" ref={this.myRef} value="Submit Comment" />
                </div>
                </form>
              :
              <div ref={ (commentBoxA) => this.commentBoxA = commentBoxA}></div>
              }
            </div>
            <div className="col" style={debateColStyle}>
              <div className="bg-dark p-2">
                <h5 className="text-light">{debateJson.disagree.displaytext} - {debateJson.disagree.usercount} Users</h5>
              </div>
              <ScrollToBottom className="debate-window">
                  {
                      arrDisagree.map((item, index) => <CommentItem changeView={this.handleViewChange}
                        id={index}
                        key={"B"+index}
                        Comment={item.Comment}
                        UserID={item.UserID}
                        UserName={item.UserName}
                          />)
                  }
                  </ScrollToBottom>
                {this.state.side==="B" && this.props.userid !== null?
                  <form onSubmit={this.handleSubmit('B')}>
                    <div ref={ (commentBoxB) => this.commentBoxB = commentBoxB}>
                      <textarea className="form-control" rows="1" id="textAreaDisagree"
                        onChange={e=>this.setState({comment: e.target.value}) }
                        value={this.state.comment} onKeyDown={this.onEnterPress('A')} /><br></br>
                      <input className="btn btn-light" type="submit" ref={this.myRef} value="Submit Comment" />
                    </div>
                </form>
                :
                <div ref={ (commentBoxB) => this.commentBoxB = commentBoxB}></div>
                }
            </div>
          </div>
        </div>
        </LoadingOverlay>
      );
    }
  }

  export default DebateWindow;
