import React from 'react';

class DebateChooseSide extends React.Component {  
    showAgreeAlert() {
      alert("Agree Comment : " + document.getElementById("textAreaAgree").value);
    }
    showDisagreeAlert() {
      alert("Disagree Comment : " + document.getElementById("textAreaDisagree").value);
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