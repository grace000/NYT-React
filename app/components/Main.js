var React = require("react");
var Query = require("./Search/Query");
var Results = require("./Search/Results")
var helpers = require("../utils/helpers")
var Saved = require("./Saved");

var Link = require('react-router').Link;
var Router = require("react-router");
var Route = Router.Route;
var Router = Router.Router;


var jumbotronStyle = {
    "boxShadow":"0 0 15px 0",
    "fontFamily": "Poppins",
}

var Main = React.createClass({

    getInitialState: function(){
        return {
            searchTerm: "",
            startYear: "",
            endYear: "",
            results: []
        }
    },

    componentDidUpdate: function(prevProps, prevState) {

        if (prevState.searchTerm !== this.state.searchTerm) {
         console.log("UPDATED");

        helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear).then(function(data) {
            if (data !== this.state.results) {
            console.log("HERE");
            console.log(data.docs);

            this.setState({ results: data.docs });
           }
        }.bind(this));
      }
    },

    //allow children to update the parent with searchTerms.
    setTerm: function(term, start, end) {
     this.setState({ searchTerm: term, startYear: start, endYear: end });
    },


    render: function(){

        console.log("Render results", this.state.results);

        return(
            <div className = "main-container">

                    <div className="container">

                        <nav className="navbar navbar-default" role="navigation">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                    <a className="navbar-brand" to="/">NYT-React</a>
                                </div>

                                <div className="collapse navbar-collapse navbar-ex1-collapse">
                                    <ul className="nav navbar-nav navbar-right">
                                        <Link to="/saved"><button className="btn btn-primary">Saved Articles</button></Link>
                                    </ul>
                                </div>
                            </div>
                        </nav>


                        <div className="jumbotron" style={jumbotronStyle}>
                            <h1 className="text-center">New York Times Search</h1>
                            <h3 className="text-center">Search for and save articles of interest</h3>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <Query setTerm={this.setTerm}/>
                            </div>
                        </div> 

                        <div className="row">
                            <div className="col-md-12">
                                <Results results={this.state.results}/>
                            </div>
                        </div>

                    </div>

            </div>
        )
    }

});

// Makes the component accessible for export
module.exports = Main;