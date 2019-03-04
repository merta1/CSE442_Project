import React from 'react';
import CommentItem from './CommentItem';

class DebateWindow extends React.Component {  
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
                      <th scope="col"><h2>{debateJson.agree.displaytext} - {debateJson.agree.usercount} Users</h2></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    arrAgree.map(item => <CommentItem changeView={this.handleViewChange} 
                        id={item.id} 
                        debateName={item.debateName} 
                        View={item.View} 
                        Comment={item.Comment}
                        UserID={item.UserID}
                        />)
                  }
                  </tbody>
                </table>
                <div>
                    <textarea rows="2" cols="50" id="textAreaAgree"></textarea><br></br>
                    <button onClick={this.showAgreeAlert}>Create Comment</button>
                </div>
            </div>
            <div class="col">
              <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col"><h2>{debateJson.disagree.displaytext} - {debateJson.disagree.usercount} Users</h2></th>
                    </tr>
                </thead>
                <tbody>
                {
                    arrDisagree.map(item => <CommentItem changeView={this.handleViewChange} 
                        id={item.id} 
                        debateName={item.debateName} 
                        View={item.View} 
                        Comment={item.Comment}
                        UserID={item.UserID}
                        />)
                } 
                </tbody>
              </table>
              <div>
                <textarea rows="2" cols="50" id="textAreaDisagree"></textarea><br></br>
                <button onClick={this.showDisagreeAlert}>Create Comment</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default DebateWindow;