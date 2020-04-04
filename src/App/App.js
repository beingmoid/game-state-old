import React from 'react'
import HomePage from '../Homepage/index'
 import MiniDrawer from '../Dashboard/Dashboard'
import SignIn from '../Login/index';
import Register from '../Register/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
 import ProtectedRoutes from '../components/ProtectedRoutes';


function App() {
  return (
   <div>
      <Router>
    <Switch>
    
        <ProtectedRoutes exact path ='/' component={MiniDrawer}></ProtectedRoutes>
        <Route exact path='/login' component={SignIn}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/homepage' component={HomePage}></Route>
    </Switch>
    </Router>

    </div>

  );
}

export default App;
