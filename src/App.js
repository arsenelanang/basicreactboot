import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


//halaman import
import About from './viewcomponent/About';
import Topic from './viewcomponent/Topic';
import Redux from './viewcomponent/Redux';
import Home from './viewcomponent/Home';
import Header from './template/Header';

class App extends React.Component {
  render() {
    return (
      
      <Router>
        <div>
        <Header />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topic">Topics</Link></li>
            <li><Link to="/redux">Redux</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topic" component={Topic}/>
          <Route path="/redux" component={Redux}/>
        </div>
      </Router>
    );
  }
}


export default App;