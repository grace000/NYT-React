var React = require("react");
var helpers = require("../../utils/helpers");
var Saved = require("../Saved");




var Results = React.createClass({

    handleClick: function(search) {
        console.log("SAVE ARTICLE CLICKED");
        console.log(search);

        helpers.saveArticles(search.snippet, search.pub_date, search.web_url).then(function() {
          console.log(search.web_url);
        });
    },

    render: function(){

        return(
            <div className = "main-container">

                    <div className="row">
                        <div className="col-lg-12">

                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h1 className="panel-title"><strong><i className="fa fa-list-alt"></i>  Search Results</strong></h1>
                                </div>

                                
                                <div className="panel-body">
                                    <ul className="list-group">
                                    {/* map function to loop through an array in JSX */}
                                    {this.props.results.map(function(search, i) {
                                        return (
                                         
                                        <li className="list-group-item" key={i}>

                                        <h3>
                                            <span><em>{search.snippet}</em></span>
                                        </h3>
                                            <span className="btn-group pull-right" >
                                                <a href={search.web_url} rel="noopener noreferrer" target="_blank" className="btn btn-default">View Article</a>
                                                <button className="btn btn-primary" onClick={() => this.handleClick(search)}>Save</button>
                                            </span>
                                        <p> Date Published: <span>{ (new Date(search.pub_date)).toLocaleDateString() }</span></p>

                                      </li>

                                        );
                                    }.bind(this))}
                                    </ul>
                                </div> 
                                
                            </div>

                        </div>
                    </div>

            </div>
        )
    }

});

// Makes the component accessible for export
module.exports = Results;