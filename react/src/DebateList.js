import React from 'react';
import DebateItem from './DebateItem';
import LoadingOverlay from 'react-loading-overlay';

class DebateList extends React.Component {
    constructor(props) {
      super(props);

      // This will be the values on the screen until the Spark API call returns.
      this.state = {
        json : {},
        isLoading : true
      };
    }

    handleViewChange = (view, url="#") => {
        this.props.changeView(view, url);
    }

    componentDidMount() {
<<<<<<< Updated upstream
      fetch(this.props.sparkEndpoint + "/debates/recent")
=======
      view=props.currentView;
      fetch(this.props.sparkEndpoint + "/debates/"+view+"/" + this.state.page)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({ json : result });
            this.setState({isLoading : false});
            console.log(result);
          },
          (error) => {
            // TODO Implement Error handling.
            alert(error);
            console.log("Error, couldn't connect to spark : " + error);
          }
        )
    }

    gotoNextPage() {
      var nextPage = this.state.page+1;
      this.setState({ page: nextPage});

      console.log("Going forward to page " + nextPage);

      fetch(this.props.sparkEndpoint + "/debates/recent/" + nextPage)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState({ json : result });
            this.setState({isLoading : false})
          },
          (error) => {
            // TODO Implement Error handling.
            console.log("Error, couldn't connect to spark : " + error);
          }
        )
    }

    gotoPreviousPage() {
      var nextPage = this.state.page-1;
      this.setState({ page: nextPage});

      console.log("Going back to page " + nextPage);

      fetch(this.props.sparkEndpoint + "/debates/recent/" + nextPage)
>>>>>>> Stashed changes
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({ json : result });
            this.setState({isLoading : false})
          },
          (error) => {
            // TODO Implement Error handling.
            console.log("Error, couldn't connect to spark : " + error);
          }
        )
    }

    render() {
    var json = this.state.json;

    var arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
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
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Question</th>
                    <th scope="col">Participants</th>
                    <th scope="col">Date</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            {arr.map(item => <DebateItem changeView={this.handleViewChange} id={item.id} debateName={item.debateName} createdDate={item.createdDate} activeUsers={item.activeUsers} />)}
            </tbody>
        </table>
        </LoadingOverlay>
      );
    }
  }

  export default DebateList;
