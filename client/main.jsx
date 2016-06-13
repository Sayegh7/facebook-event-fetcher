import React from 'react'
import ReactDOM from 'react-dom'
import {Meteor} from 'meteor/meteor'
import App from '../imports/ui/App.jsx'
// import {render} from 'react-dom'
// import '../imports/startup/accounts-config.js'
//
//
// const {Router, Route, IndexRoute, browserHistory} = ReactRouter;
//
// Meteor.startup(function() {
//   ReactDOM.render((
//     <Router history={browserHistory}>
//       <Route path="/" component={App}>
//         <Route path="*" component={NotFoundPage} />
//       </Route>
//     </Router>
//   ), document.getElementById('render-target'));
// });


Meteor.startup(function() {
ReactDOM.render(<App />, document.getElementById('render-target'))

});
