import React from 'react';

class StartNewDebate extends React.Component 
{

    constructor(props) {
      super(props);
      this.state = 
      {
       ownerid : '',
       open : '1',
       publicity: '1',
       title : '',
       sideA : '',
       sideB : '',
       summary : '',

      //centerStyle : {
      //   textAlign : 'center'
      //}
      };

      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleError = msg => 
    {

      this.setState({error: msg});
      this.setState({hasError: true});
      
    }

    /*
    handleSubmit(event) {
      event.preventDefault();
      this.props.userID;

      fetch(this.props.sparkEndpoint + "/debate", {
        method: "POST",
        body: event.target
      }).then(
        (result) => {
          alert("Posted to the server!")
        },
        (error) => {
          // TODO Implement Error handling.
          console.log("Error, couldn't connect to spark : " + error);
        }
      )
      return false;
    }
*/
handleSubmit = type => event =>
{

       let self = this;
       let formBody,property,encodedKey,encodedValue;
       formBody = [];
       for (property in self.state) 
       {
               encodedKey = encodeURIComponent(property);
               encodedValue = encodeURIComponent(self.state[property]);
               formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");

       fetch(self.props.sparkEndpoint + "/debate", {
               method: 'post',
               headers: {
                       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               body: formBody,
       }).then(function(response) {
               return response.json();
       }).then(function(data) {
               if (data.status === "ok") {
                       
                       self.props.changeView('DebateWindow', self.props.data.debateid); // data.debateID
               } else {
                       self.handleError(data.message);
               }
       }).catch(function(err) {
               console.log("Fetch Error: ",err);
       });

}

    render() {
      return (
          <>
            <h4 class="mb-3 mt-3" style={this.state.centerStyle}>New Debate</h4>
            <form onSubmit={this.handleSubmit}>
              <div class="bg-light">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label htmlFor="title">Debate Title</label>
                    <input name="title" type="text" class="form-control" id="title" placeholder="A Good Debate Topic" required="" value={this.state.title}/>
                    <div class="invalid-feedback">
                      A valid debate title is required.
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm">
                    <label htmlFor="readPermissions">Who can view this debate :</label>
                    <select name="readPermissions" class="form-control" id="readPermissions">
                      <option value="1">Anyone</option>
                      <option value="2">Invite Only</option>
                      <option value="4">Only Me</option>
                    </select>
                  </div>
                  <div class="col-sm">
                    <label htmlFor="writePermissions">Who can participate :</label>
                    <select name="writePermissions" class="form-control" id="writePermissions">
                      <option value="1">Anyone</option>
                      <option value="2">Users logged in</option>
                      <option value="4">Only Me</option>
                    </select>
                  </div>
                </div>
                <hr />

                <div class="row">
                  <div class="col w-50">
                    <label htmlFor="summary">Debate Summary :</label>
                    <textarea name="summary" class="form-control" id="summary" rows="3" value={this.state.summary}></textarea>
                  </div>
                  <div class="col w-50">
                    <div class="row">
                      <div class="col w-50">
                        <label htmlFor="SideATitle">Side A Title :</label>
                        <textarea name="SideATitle" class="form-control" id="SideATitle" value ={this.state.sideA} rows="1"></textarea>
                      </div>
                      <div class="col w-50">
                        <label htmlFor="SideBTitle">Side B Title :</label>
                        <textarea name="SideBTitle" class="form-control" id="SideBTitle"  value ={this.state.sideB}rows="1"></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div style={this.state.centerStyle}>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>

              </div>
            </form>
          </>
      );
    }
  }

  export default StartNewDebate;
