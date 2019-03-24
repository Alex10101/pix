import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import Index from './Index';
import NotFound from './NotFound';
import CreateForm from './CreateForm'
import './styles/index.css';
import Header from './Header';
import Popup from'./Popup';

const history = createBrowserHistory();

const App = () => {
  return (
    <div className="App">
      <div className="container main"> 

    	<BrowserRouter>  
        <React.Fragment>
          <Header/>
          <Popup/>
          <Route path="/articles/:id/edit" exact render={ (props) => <CreateForm {...props} /> }/>
          <Route path="/articles/create" exact render={(props) => <CreateForm {...props} />}/>
          <Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/articles?page=1"/>
            )}/>
            <Route path="/articles:page?" component={Index} history={history}/>
            <Route component={NotFound}/>
          </Switch>
        </React.Fragment>
    	</BrowserRouter>
      </div>
    </div>
  );    
}

export default App;
