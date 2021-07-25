import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Link } from 'react-router-dom'
import React from 'react';
import Home from './Components/Home';
import Helmets from './Components/Helmets';
import Chests from './Components/Chests';
import Arms from './Components/Arms';
import Legs from './Components/Legs';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="nav">
        <div><Link to="/" style={{textDecoration: 'inherit', color: 'inherit'}}>Home</Link></div>
        <div><Link to="/Helmets" style={{textDecoration: 'inherit', color: 'inherit'}}>Helmets</Link></div>
        <div><Link to="/Chests" style={{textDecoration: 'inherit', color: 'inherit'}}>Chests</Link></div>
        <div><Link to="/Arms" style={{textDecoration: 'inherit', color: 'inherit'}}>Arms</Link></div>
        <div><Link to="/Legs" style={{textDecoration: 'inherit', color: 'inherit'}}>Legs</Link></div>
        </div>
      <div className='body'>
      <Route exact path="/" component={Home}/>
      <Route path="/Helmets" component={Helmets}/>
      <Route path="/Chests" component={Chests}/>
      <Route path="/Arms" component={Arms}/>
      <Route path="/Legs" component={Legs}/>
      </div>
      </Router>
    </div>
  );
}

export default App;
