import React , {Component} from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from './handmodules/home'
import Login from './handmodules/login'
import './App.css';

class App extends Component{

  render(){
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/Login/" component={Login} />
        </Router>
      </div>
    );
  }
  
}

export default App;
