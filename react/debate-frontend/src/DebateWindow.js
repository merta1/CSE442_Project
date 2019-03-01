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
      var jsonAgree = {
        "1":{"id":146,"debateName":"debate 146","View":"Agree","Comment":"It is Awesome!!!"},
        "2":{"id":146,"debateName":"debate 146","View":"Agree","Comment":"YEAH!!!!!!!!"},
        "3":{"id":146,"debateName":"debate 146","View":"Agree","Comment":"Best APP ever :D"}
      }
      var arrAgree = [];
      Object.keys(jsonAgree).forEach(function(key) {
        arrAgree.push(jsonAgree[key]);
      });
      
      var jsonDisagree = {
        "1":{"id":146,"debateName":"debate 146","View":"Disagree","Comment":"Eh!!"},
        "2":{"id":146,"debateName":"debate 146","View":"Disagree","Comment":"Worst App Yet!!!!!!!!"}
      }
      var arrDisagree = [];
      Object.keys(jsonDisagree).forEach(function(key) {
        arrDisagree.push(jsonDisagree[key]);
      });

      return (
        // <div onClick={() => this.props.changeView('DebateList')}>
          //  Draw Debate Window for {this.props.debateid} here
          <div class="center">
            <p><h1>#{this.props.debateid} - Is this Debate App rocks?</h1></p>
            <table class="table">
              <td>
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col"><h2>Agree</h2></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    arrAgree.map(item => <CommentItem changeView={this.handleViewChange} 
                        id={item.id} 
                        debateName={item.debateName} 
                        View={item.View} 
                        Comment={item.Comment}
                        />)
                  }
                  <textarea rows="2" cols="50" id="textAreaAgree"></textarea><br></br>
                  <button onClick={this.showAgreeAlert}>Create Comment</button>
                  </tbody>
                </table>
              </td>
              <td>
              <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col"><h2>Disagree</h2></th>
                </tr>
              </thead>
              <tbody>
              {
                arrDisagree.map(item => <CommentItem changeView={this.handleViewChange} 
                    id={item.id} 
                    debateName={item.debateName} 
                    View={item.View} 
                    Comment={item.Comment}
                    />)
              } 
              </tbody>
            </table>
            <textarea rows="2" cols="50" id="textAreaDisagree"></textarea><br></br>
            <button onClick={this.showDisagreeAlert}>Create Comment</button>
              </td>
            </table>
          </div>
      );
    }
  }

  export default DebateWindow;