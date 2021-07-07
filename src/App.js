import Nav from './Nav.js'
import Thread from './Thread'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login.js';
import SignUp from './SignUp.js';
import About from './About.js';
import Home from './Home.js';
import Analytics from './Analytics.js';
import UserPage from './UserPage.js';
import TagsPosts from './TagsPosts.js';
import { useState, useEffect } from 'react';
import AnalyticsByTags from './AnalyticsByTags.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(true)

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
          <Route path="/" exact render={(props)=><Home setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
          <Route path="/login" render={() => <Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/about" component={About} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/thread/:id" render={(props)=><Thread loggedIn={loggedIn}/>} />
          <Route path="/user/:id" component={UserPage} />
          <Route path="/tags/:tag" component={TagsPosts} />
          <Route path="/analyticsByTags" component={AnalyticsByTags} />
        </Switch>

      </div>

    </Router>

  );
}

export default App;
