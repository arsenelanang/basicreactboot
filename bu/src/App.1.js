import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  Alert,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

import Clock from './Clock';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      visible: true,
      email: "",
      password: "",
      text:"isi text sebenarne"
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  emailChange(event) {
   
    this.setState({email: event.target.value.toUpperCase()});
    this.setState({text: this.state.email});
  }
  passwordChange(event) {
    this.setState({password: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    this.setState({text: this.state.email});
  }
  // handleChange(event) {
  //   this.setState({value: event.target.value.toUpperCase()});
  // }
  onDismiss() {
    this.setState({ visible: false });
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    
    return (
      <div>
      
        

          <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          I am an alert and I can be dismissed!
          </Alert>
          
        <Container>
          <Row>
            <Col md="6">
              <Form onSubmit={this.handleSubmit}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                <Input type="text" value={this.state.email} onChange={this.emailChange} id="exampleEmail" placeholder="something@idk.cool" />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                <Input type="text" value={this.state.password} onChange={this.passwordChange}  id="examplePassword" placeholder="don't tell!" />
              </FormGroup>
              <br />
              <Button>Submit</Button>
              </Form>
            </Col>
            <Col md="6">
              <h1 className="display-3">Infinity Wars</h1>
              <Clock />
              <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input type="textarea" value={this.state.text} name="text" id="exampleText" />
              </FormGroup>
              <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
              {/* <img src="https://cdn.shopify.com/s/files/1/0489/4081/products/one-piece-whitebeard-jolly-roger-sticker_1024x1024.jpg?v=1427615057" class="img-rounded"  alt="Cinque Terre" /> */}
            </Col>
          </Row>     
        </Container>
    </div>
    );
  }
}



export default App;

