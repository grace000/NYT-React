var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all Routes
// Can pass in some configuration as props
var Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;


// Reference the high-level components
var Main = require("../components/Main");
var Saved = require("../components/Saved");

const Home = () => (<div><h1>Welcome home</h1></div>)

var Routes = React.createClass ({

	render() {
		return (
		// The high level component is the Router component
		  <Router history={hashHistory}>
		  
		    <div>
		     <Route exact path="/" component={Main}/>
		     <Route path="/saved" component={Saved}/>
		    </div>
		    
		  </Router>
		)
	}

})

module.exports = Routes;
