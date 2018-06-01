var React = require("react");

var Results = require("./Search/Results");
var helpers = require("../utils/helpers")

var Link = require('react-router').Link;
var Router = require("react-router");

var containerStyle = {
    "fontFamily": "Roboto",
    "boxShadow":"0 0 15px 0"
}

var jumbotronStyle = {
    "boxShadow":"0 0 15px 0",
    "fontFamily": "Poppins",
}

var Saved = React.createClass({

  getInitialState: function() {
	    return { savedArticles: "" };
  },

  // When this component mounts, get all saved articles from db
  componentDidMount: function() {
    helpers.getArticles().then(function(articleData) {
      this.setState({ savedArticles: articleData.data });
      console.log("saved results", articleData.data);
        }.bind(this));
  },

  handleClick: function(article){
  	helpers.deleteArticles(article._id).then(function(){
  		console.log(article._id);
  	})
  },

  renderEmpty: function() {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>Save your first article...</em>
          </span>
        </h3>
      </li>
    );
  },

  // A helper method for mapping through articles and outputting some HTML
  renderArticles: function() {
    return this.state.savedArticles.map(function(article, index) {

      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{article.title}</em>
              </span>
            </h3>
            <span className="btn-group pull-right">
                <a href={article.url} rel="noopener noreferrer" target="_blank" className=" btn btn-default">View Article</a>
                <button className="btn btn-danger" onClick={() => this.handleClick(article)}>Delete</button>
            </span>
            <p> Date Published: <span>{ (new Date(article.date)).toLocaleDateString() }</span></p>
          </li>
        </div>
      );
    }.bind(this));
  },

  renderContainer: function() {
    return (
      	<div className="main-container">
        
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
		                <Link className="navbar-brand" to="/">NYT-React</Link>
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
	          <div className="col-lg-12">
	            <div className="panel panel-primary" style={containerStyle}>
	              <div className="panel-heading">
	                <h1 className="panel-title">
	                  <strong>
	                    <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
	                </h1>
	              </div>
	              <div className="panel-body">
	                <ul className="list-group">
	                  {this.renderArticles()}
	                </ul>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
    );
  },

render: function() {
    {/*If no articles, return this.renderEmpty() which in turn returns some HTML*/}
    if (!this.state.savedArticles) {
      return this.renderEmpty();
    }
    {/*If articles, return this.renderContainer() which in turn returns all saves articles*/}
    return this.renderContainer();
  }
})

module.exports = Saved;

