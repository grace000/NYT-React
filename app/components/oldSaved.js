var React = require("react");

var Results = require("./Search/Results");
var helpers = require("../utils/helpers")

var OldSaved = React.createClass({

 getInitialState: function() {
    return { articles: "" };
  },

  // When this component mounts, get all saved articles from db
  componentDidMount: function() {
    helpers.getArticles().then(function(articleData) {
      this.setState({ articles: articleData.data });
      console.log("saved results", articleData.data);
    }.bind(this));
  },


    // componentDidUpdate: function(prevProps, prevState) {

    //     if (prevState.searchTerm !== this.state.searchTerm) {
    //      console.log("UPDATED");
    //        helpers.getArticles().then(function(updatedArticles){
    //         if (prevProps.articles !== this.updatedArticles) {
    //         // if (prevProps.savedArticles !== this.state.savedArticles) {
    //             this.setState({articles: updatedArticles.data});
    //             console.log("saved from main");
    //         }
    //     }.bind(this));

    //   }
    // },

  // If the component updates 
  componentDidUpdate: function(prevProps, prevState) {
      helpers.getArticles().then(function(updatedArticles){
        if (prevProps.articles !== this.updatedArticles) {
        // if (prevProps.savedArticles !== this.state.savedArticles) {
            this.setState({articles: updatedArticles.data});
            console.log("saved from main");
        }
      }.bind(this))
   },

   if(prevState.savedArticles !== this.state.savedArticles) {
        console.log("update articles from main");

        helpers.getArticles(this.state.savedArticles).then(function(articleData){
            if (articleData !== this.state.savedArticles) {
                console.log("up oh");
                this.setState({savedArticles: articleData})
            }
        }.bind(this));
      }
    },

   handleClick: function(article){
    helpers.deleteArticles(article._id).then(function(){
      // Set the parent to have the search term
        this.props.setArticles(this.state.articles);
        this.setState({ articles: "" });
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
    return this.state.articles.map(function(article, index) {

      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{article.title}</em>
              </span>
              <span className="btn-group pull-right">
                <a href={article.url} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">View Article</button>
                </a>
                <button className="btn btn-primary" onClick={() => this.handleClick(article)}>Delete</button>
              </span>
            </h3>
            <p> Date Published: <span>{ (new Date(article.date)).toLocaleDateString() }</span></p>
          </li>
        </div>
      );
    }.bind(this));
  },

  renderContainer: function() {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
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
    );
  },

render: function() {
    // If no articles, return this.renderEmpty() which in turn returns some HTML
    if (!this.state.articles) {
      return this.renderEmpty();
    }
    // If articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }

})

module.exports = OldSaved;

