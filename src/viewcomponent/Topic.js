import React, { Component } from 'react';
import Home from './Home';
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
    Form, FormGroup, Label, Input, FormText,Table 
  } from 'reactstrap';
  import axios from 'axios';
  import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';


class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : "email",
            password: "password",
            visible: false,
            persons: [],
            text: "",
            price: "",
            category_id: "",
            currentPage: 1,
            todosPerPage: 3
            
          };
          
        this.onDismiss = this.onDismiss.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }

    emailChange(event) {
   
      this.setState({email: event.target.value});
      // this.setState({text: this.state.email});
    }
    passwordChange(event) {
      this.setState({password: event.target.value});
    }

    handleSubmit(event) {
      // this.setState({text: this.state.email});
      var form_data = {
          name: this.state.email,
          description: this.state.password,
          price: this.state.price,
          category_id: "kosong"
      }

      let data = JSON.stringify(form_data);
      // alert(this.state.email);
      axios.post(`http://localhost/restapi/product/create.php`, data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      this.componentDidMount();
      this.setState({password: ""});
      this.setState({email: ""});
      this.setState({visible: true});
    }
    fetchData(){
        axios.get(`http://localhost/restapi/product/read.php`)
        .then(res => {
            console.log(res);
            const persons = res.data.records;
            console.log(persons);
            const person1 = persons.map((person, i) => person.name )
            console.log(person1);
            this.setState({ persons });
        })
    }

    readData(idbaru, e){
      // alert(idbaru);
      axios.get(`http://localhost/restapi/product/read_one.php?id=`+ idbaru)
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        const barang = res.data;
        console.log(barang);
        this.setState({email : barang.name});
        this.setState({password : barang.description});
      })
    }

    componentDidMount() {
      axios.get(`http://localhost/restapi/product/read.php`)
        .then(res => {
          const persons = res.data.records;
          console.log(persons, "hai");
          // console.log(res, "hai");
          this.setState({ persons });
        })
    }
    onDismiss() {
      this.setState({ visible: false });
    }


    render() {

    const { persons, currentPage, todosPerPage } = this.state;

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;


    // <th scope="row">{ this.state.persons.map(person => <p key={person.id}>{person.id}</p>)}</th>
    //                     <td>{ this.state.persons.map(person => <p key={person.id}>{person.name}</p>)}</td>
    //                     <td>{ this.state.persons.map(person => <p key={person.id}>{person.price}</p>)}</td>
    //                     <td>{ this.state.persons.map(person => <p key={person.id}>{person.description}</p>)}</td>
    const currentTodos = this.state.persons.slice(indexOfFirstTodo, indexOfLastTodo);
    console.log(currentTodos);

    const renderTodos = currentTodos.map((person) => {
      return <li key={person.id}>{person.id}</li>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.persons.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });



      return (
        <div>
          <p>ini adalah halaman Topic</p>
          <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
            <h1>Simpan Berhasil</h1>
          </Alert>
          
          
          <Container>
            <Row>
                <Col md="6">

                <Form >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input type="text"  value={this.state.email} onChange={this.emailChange} id="exampleEmail"  />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input type="text"   value={this.state.password} onChange={this.passwordChange}  id="examplePassword"  />
                </FormGroup>
                <br />
                <Button onClick={this.handleSubmit}>Submit</Button>
                <Button onClick={this.fetchData}>Fetch</Button>
                

                </Form>
                </Col>

                <Col md="6">
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{ this.state.persons.map(person => <p key={person.id}>{person.id}</p>)}</th>
                        <td>{ this.state.persons.map(person => <p key={person.id}>{person.name}</p>)}</td>
                        <td>{ this.state.persons.map(person => <p key={person.id}>{person.price}</p>)}</td>
                        <td>{ this.state.persons.map(person => <p key={person.id}>{person.description}</p>)}</td>
                      </tr>
                      
                    </tbody>
                  </Table>
                </Col>
                <div>
        <ul>
          {renderTodos}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
                
            </Row>     
            {/* <ul>
            { this.state.persons.map(person => <li  key={person.id}>{person.id}{person.name} 
            <Button onClick={this.readData.bind(this, person.id)}>lihat</Button>
            </li>)}
           </ul> */}
          </Container>
        </div>
      );
    }
  }

  export default Topic;
