import React from 'react';

class DebateChooseSide extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        userid : props.userid,
        debateid : props.debateid
      };

      this.postChoice = this.postChoice.bind(this);
      this.showAgreeAlert = this.showAgreeAlert.bind(this);
      this.showDisagreeAlert = this.showDisagreeAlert.bind(this);

      console.log(props.debateid);
    }

    postChoice(choice) {
      //alert("Agree Comment : " + document.getElementById("textAreaAgree").value);
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
              console.log(response);
              return response.json();
      }).then(function(data) {
              if (data.status === "ok") {
                      //self.props.changeView("DebateWindow", this.props.debateid);
                      alert("You choose the "+choice+" side!");
              } else {
                      self.handleError(data.message);
              }
      }).catch(function(err) {
              console.log("Fetch Error: ",err);
      });
    }

    showAgreeAlert() {
      this.postChoice("A");
    }
    showDisagreeAlert() {
      this.postChoice("B");
    }
    render() {
      var debateJson = {
        "question":"Do you think CSE is a good program?",
        "debateid":147,
        "totalcomments":5,
        "agree":{
            "displaytext":"Agree",
            "usercount":2,
            "commentcount":3,
            "comments":{
                "1":{"id":146,"debateName":"debate 146","View":"Agree","Comment":"It is Awesome!!!","UserID":"dadkins20"},
                "2":{"id":146,"debateName":"debate 146","View":"Agree","Comment":"YEAH!!!!!!!!","UserID":"mert"},
                "3":{"id":146,"debateName":"debate 146","View":"Agree","Comment":"Best APP ever :D","UserID":"dadkins20"}
            }
        },
        "disagree":{
            "displaytext":"Disagree",
            "usercount":2,
            "commentcount":2,
            "comments":{
                "1":{"id":146,"debateName":"debate 146","View":"Disagree","Comment":"Eh!!","UserID":"JonForce"},
                "2":{"id":146,"debateName":"debate 146","View":"Disagree","Comment":"Worst App Yet!!!!!!!!","UserID":"Anu"}
            }
        }
      }

      var arrAgree = [];
      Object.keys(debateJson.agree.comments).forEach(function(key) {
        arrAgree.push(debateJson.agree.comments[key]);
      });

      var arrDisagree = [];
      Object.keys(debateJson.disagree.comments).forEach(function(key) {
        arrDisagree.push(debateJson.disagree.comments[key]);
      });

      return (
        // <div onClick={() => this.props.changeView('DebateList')}>
          //  Draw Debate Window for {this.props.debateid} here
        <div class="container">
          <div class="row mb-4 mt-4">
            <h1>{debateJson.question} - #{this.props.debateid}</h1>
          </div>
          <div class="row">
            <div class="col">
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col"><h2>Click below to agree! </h2></th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
                <div>

                    <button onClick={this.showAgreeAlert}> I agree</button>
                </div>
            </div>
            <div class="col">
              <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col"><h2>Click below to disagree!</h2></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
              <div>

                <button onClick={this.showDisagreeAlert}>I disagree</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default DebateChooseSide;
