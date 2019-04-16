import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Alert extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isActive: true,
    }
  }

  hideAlert() {
    this.setState({
      isActive: false,
    });
  }

  render() {
    return (
      <div> 
          {this.state.isActive &&  <div className={"container alert alert-dismissible alert-"+this.props.color}>
  <button type="button" class="close" data-dismiss="alert"  onClick={() => this.hideAlert()}>&times;</button>
  <h4 class="alert-heading"> {this.props.header}</h4>
  
  <Link to={this.props.link} class="alert-link">{this.props.linktext}</Link>.
</div>}

      </div>
    );
  }
}
export default Alert;