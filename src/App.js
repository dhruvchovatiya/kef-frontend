import Nav from './Nav.js'
import Thread from './Thread'
import Card from './Card.js'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login.js';
import SignUp from './SignUp.js';
import About from './About.js';
import Home from './Home.js';
import Analytics from './Analytics.js';
import UserPage from './UserPage.js';
import { useState, useEffect } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(true)
  const a = true

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false)
    }
    
  }, [])

  return (
    <Router>
      <div>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/" exact render={(props)=><Home setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
          <Route path="/login" render={() => <Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/about" component={About} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/thread/:id" render={(props)=><Thread loggedIn={loggedIn}/>} />
          <Route path="/user/:id" component={UserPage} />


        </Switch>

      </div>

    </Router>






  );
}

export default App;
