import React, { PropTypes, Component } from 'react'
import classnames from 'classnames';

export default class Event extends Component{
  render(){
    return (
          <li>
            <span className="text">shit</span>
          </li>
    )
  }


}


Event.propTypes = {
  event: PropTypes.object.isRequired,
}
