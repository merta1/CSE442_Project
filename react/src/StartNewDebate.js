import React from 'react';

class StartNewDebate extends React.Component 
{

    constructor(props) {
      super(props);
      this.state = 
      {
       ownerid : this.props.userID,
       open : '1',
       public: '1',
       title : '',
       SideATitle : '',
       SideBTitle : '',
       Summary : '',

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
handleSubmit(event)
{
      event.preventDefault();
       
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
				   window.location.hash = "#/debate/"+ data.debateID;
				   self.props.changeView('DebateWindow', data.debateID); 
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
            <h1 class="mb-3 mt-3" style={this.state.centerStyle}>New Debate</h1>
            <form onSubmit={this.handleSubmit}>
              <div class="bg-light p-3">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label htmlFor="title">Debate Title</label>
                    <input name="title" type="text" class="form-control" id="title" placeholder="A Good Debate Topic" required="" value={this.state.title} onChange={e=>this.setState({title: e.target.value})}/>
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
                    <textarea name="summary" class="form-control" id="summary" rows="3" value={this.state.Summary} onChange={e=>this.setState({Summary: e.target.value})}></textarea>
                  </div>
                  <div class="col w-50">
                    <div class="row">
                      <div class="col w-50">
                        <label htmlFor="SideATitle">Side A Title :</label>
                        <textarea name="SideATitle" class="form-control" id="SideATitle" value ={this.state.SideATitle} onChange={e=>this.setState({SideATitle: e.target.value})}rows="1"></textarea>
                      </div>
                      <div class="col w-50">
                        <label htmlFor="SideBTitle">Side B Title :</label>
                        <textarea name="SideBTitle" class="form-control" id="SideBTitle"  value ={this.state.SideBTitle} onChange={e=>this.setState({SideBTitle: e.target.value})}rows="1"></textarea>
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

