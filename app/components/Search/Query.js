var React = require("react");
var helpers = require("../../utils/helpers");

var Query = React.createClass({

    getInitialState: function(){
        return {
            term: "",
            start: "",
            end: ""
        };
    },

    // This function will respond to the user input
    handleChange: function(e) {
          if (e.target.name === "term") {
            this.setState({
              term: e.target.value
            });
          }
        if (e.target.name === "start") {
                this.setState({
                  start: e.target.value
            });
        }
        if (e.target.name === "end") {
                this.setState({
                  end: e.target.value
            });
        }
        
    },

    // When a user submits...
    handleSubmit: function(event) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();

        // Set the parent to have the search term
        this.props.setTerm(this.state.term, this.state.start, this.state.end);
        this.setState({ term: "", start: "", end: "" });
    },

    render: function(){

        console.log("Search Term", this.state.term);
        console.log("Start Date", this.state.start);
        console.log("End Date", this.state.end);

        return(
            <div className = "main-container">

                <div className="row">
                    <div className="col-lg-12">

                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h1 className="panel-title"><strong><i className="fa fa-newspaper-o" aria-hidden="true"></i>  Search Parameters</strong></h1>
                            </div>
                            <div className="panel-body">


                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <h4 className=""><strong>Topic</strong></h4>
                                        <input type="text" className="form-control " id="search_topic" name="term" value={this.state.term} onChange={this.handleChange} required/>

                                        <h4 className=""><strong>Start Year</strong></h4>
                                        <input type="text" className="form-control " id="search_start" name="start" value={this.state.start} onChange={this.handleChange} required/>

                                        <h4 className=""><strong>End Year</strong></h4>
                                        <input type="text" className="form-control " id="search_end" name="end" value={this.state.end} onChange={this.handleChange} required/>

                                    </div>


                                    <div className="pull-right">
                                        <button type="submit" className="btn btn-primary"><h4>Search</h4></button>
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        )
    }

});

// Makes the component accessible for export
module.exports = Query;