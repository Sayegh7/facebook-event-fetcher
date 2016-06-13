import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Task from './Task.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'
import {createContainer} from 'meteor/react-meteor-data'
import {Tasks} from '../api/tasks.js'
import {Event} from './Event.jsx'
import { Meteor } from 'meteor/meteor'
import {HTTP} from 'meteor/http'
class App extends Component{
constructor(props){
  super(props);
  this.state = {
    hideCompleted : false,
    events: [],
    isLoading: true
  }
}

componentWillMount(){
  const that = this
  HTTP.call("GET", "https://graph.facebook.com/v2.6/BdayaNGO/events?access_token=1696552830594033|prT7pWWhwfZZRd-Xqunyf4RvwtA",
            {},
            function (error, result) {
              if (!error) {
                console.log(that.state.events)
                that.setState({
                  events: result.data.data,
                  isLoading : false
                });
                // that.forceUpdate()
              }
            });
}
toggleHideCompleted(){
  this.setState({
    hideCompleted: !this.state.hideCompleted
  })
}
componentDidMount(){
  console.log("hah");
}


renderTasks(){
  // let filteredTasks = this.props.tasks
  // if(this.state.hideCompleted){
  //   filteredTasks = filteredTasks.filter(task => !task.checked)
  // }
  //
  // return filteredTasks.map(
  //   function(task){
  //     let currentusermail = Meteor.user().emails[0].address
  //     let showPrivate = (currentusermail == task.email)

      // return(<Task key={task._id} task={task} showPrivate={showPrivate}/>)
      if(this.state.events.length == 0){
        return
      }
      return this.state.events.map(function(event){
        return (<li>{event.name}</li>)
      });
// }
}




handleSubmit(event){
  event.preventDefault();
  const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

  Meteor.call('tasks.insert', text)
  // Tasks.insert({
  //   text,
  //   createdAt: new Date(),
  //   owner: Meteor.userId(),
  //   email: Meteor.user().emails[0].address
  // })

  ReactDOM.findDOMNode(this.refs.textInput).value = ''
}
render(){
  return (
    <div className="container">
      <header>
        <h1>Todo List ({this.state.events.length})</h1>
          <label className="hide-completed">
                     <input
                       type="checkbox"
                       readOnly
                       checked={this.state.hideCompleted}
                       onClick={this.toggleHideCompleted.bind(this)}
                     />
                     Hide Completed Tasks
                   </label>
                   <AccountsUIWrapper />

          {this.props.currentuser ? <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
          </form>: ''}
      </header>

      <ul>
        {this.state.isLoading ? "Loading" : this.renderTasks()}
      </ul>

    </div>
  )
}

}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentuser: PropTypes.object.isRequired
}


export default createContainer(() => {

  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({checked: { $ne: true}}).count(),
    currentuser: Meteor.user()
  };
}, App);
