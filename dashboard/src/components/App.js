import React from 'react';
import Dashboard from './Dashboard.js';
import Products from './Products.js'
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/'>
            <Dashboard/>
        </Route>
        <Route path='/Products'>
            <Products/>
        </Route>
      </Switch> 
    </React.Fragment>
  );
};

export default App;
