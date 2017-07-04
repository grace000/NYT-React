// Dependencies
var React = require("react");

// Includes the two children
var Query = require("./Search/Query");
var Results = require("./Search/Results");
var helpers = require("../utils/helpers");

var Search = React.createClass({


    // Include the helpers for making API Calls
    getInitialState: function(){
        return {
            "term": "",
            "start": "",
            "end": "",
            "results": {}
        };
    },

    // Runs the query with the initial state variables
    componentDidMount: function(){

        // Calls the axios helper query
        helpers.runQuery(this.state.term, this.state.start, this.state.end).then(function(data){
            this.setState({results: data.docs } )
        }.bind(this));

    },

    render: function(){

        console.log("Rendering the Search Component");

        return (

            <div className="main-container">
                <Query />
                <Results results= {this.state.start}/>
            </div>
        )
    }
})

module.exports = Search;