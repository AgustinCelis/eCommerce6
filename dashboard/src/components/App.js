import React from 'react';
import Dashboard from './Dashboard.js';
import Products from './Products.js'
import LastInDb from './LastInDb.js'
import Error404 from './Error404.js'
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
        <Route path='/LastInDb'>
            <LastInDb/>
        </Route>
        <Route component={Error404}/>
      </Switch> 
    </React.Fragment>
  );
};

export default App;
