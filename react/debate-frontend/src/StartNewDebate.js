import React from 'react';

class StartNewDebate extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        centerStyle : {
          textAlign : 'center'
        }
      };

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
      alert("Form submitted!\nFirstName : " + event.target.firstName.value
          +"\nLastName : " + event.target.lastName.value
          +"\nWhoCanView : " + event.target.whoCanView.value
          +"\nWhoCanDebate : " + event.target.whoCanDebate.value
          +"\nDebateSummary : " + event.target.debateSummary.value
          +"\nSideATitle : " + event.target.debateSideA.value
          +"\nSideBTitle : " + event.target.debateSideB.value);
      return false;
    }

    render() {
      return (
          <>
            <h4 class="mb-3 mt-3" style={this.state.centerStyle}>New Debate</h4>
            <form onSubmit={this.handleSubmit}>
              <div class="bg-light">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input name="firstName" type="text" class="form-control" id="firstName" placeholder="Jane" required="" />
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input  name="lastName" type="text" class="form-control" id="lastName" placeholder="Smith" required="" />
                    <div class="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm">
                    <label htmlFor="whoCanView">Who can view this debate :</label>
                    <select name="whoCanView" class="form-control" id="whoCanView">
                      <option>Anyone</option>
                      <option>Invite Only</option>
                      <option>Only Me</option>
                    </select>
                  </div>
                  <div class="col-sm">
                    <label htmlFor="whoCanDebate">Who can participate :</label>
                    <select name="whoCanDebate" class="form-control" id="whoCanDebate">
                      <option>Anyone</option>
                      <option>Users logged in</option>
                      <option>Only Me</option>
                    </select>
                  </div>
                </div>
                <hr />

                <div class="row">
                  <div class="col w-50">
                    <label htmlFor="debateSummary">Debate Summary :</label>
                    <textarea name="debateSummary" class="form-control" id="debateSummary" rows="3"></textarea>
                  </div>
                  <div class="col w-50">
                    <div class="row">
                      <div class="col w-50">
                        <label htmlFor="debateSideA">Side A Title :</label>
                        <textarea name="debateSideA" class="form-control" id="debateSideA" rows="1"></textarea>
                      </div>
                      <div class="col w-50">
                        <label htmlFor="debateSideB">Side B Title :</label>
                        <textarea name="debateSideB" class="form-control" id="debateSideB" rows="1"></textarea>
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
