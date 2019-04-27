import React from 'react';
import Error from './Error';

class DebateChooseSide extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        json : {
          "agree" : {
            "comments":{},
          },
          "disagree" : {
            "comments":{},
          },
        },
        userid : props.userid,
        debateid : props.debateid
      };

      //this.postChoice = this.postChoice.bind(this);
    }

    handleError = msg => {
      this.setState({error: msg});
      this.setState({hasError: true});
    }

    postChoice(choice) {
      let self = this;
      let formBody = [];
      formBody.push("debateid=" + encodeURIComponent(self.props.debateid));
      formBody.push("userid=" + encodeURIComponent(self.props.userid));
      formBody.push("side=" + encodeURIComponent(choice));
      formBody = formBody.join("&");

      fetch(self.props.sparkEndpoint + "/user/setpreference", {
        method: 'post',
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody,
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        if (data.status === "ok") {
          self.props.changeView('DebateWindow', data.debateid); 
        } else {
          self.handleError(data.message);
        }
      }).catch(function(err) {
        console.log("Fetch Error: ",err);
      });
    }

    componentDidMount() {
      fetch(this.props.sparkEndpoint + "/debate/" + this.props.debateid)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({ json : result });
            this.setState({ isLoading : false });
          },
          (error) => {
            console.log("Error, couldn't connect to spark : " + error);
          }
        );
    }

    render() {
      var debateJson = this.state.json;
      return (
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
                      <th scope="col"><h2>{debateJson.agree.displaytext} </h2></th>
                    </tr>
                  </thead>
                </table>
                <div align="center">
                    <button onClick={()=>{ this.postChoice("A"); }}> Choose This Side </button>
                </div>
            </div>
            <div className="col">
              <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col"><h2>{debateJson.disagree.displaytext}</h2></th>
                    </tr>
                </thead>
              </table>
              <div align="center">
                <button onClick={()=>{ this.postChoice("B"); }}> Choose This Side </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default DebateChooseSide;
