import React, { Component } from 'react';
import {Alert, Form, FormGroup,Input} from 'reactstrap';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
            visible: true,
            
          };
          
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    render() {
      return (
        <div>
          
          <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          {this.props.alertBaru}
          </Alert>
          
        </div>
      );
    }
  }

  export default Home;
