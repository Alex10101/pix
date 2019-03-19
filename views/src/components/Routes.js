import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import Index from './Index';
import NotFound from './NotFound';
import CreateForm from './CreateForm'
import './styles/index.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container main"> 
      	<BrowserRouter>  
          <React.Fragment>
            <Route path="/articles/:id/edit" exact history={history}
              render={ (props) => <CreateForm article={ props.location.article || false }/> }
            />
            <Route path="/articles/create" exact history={history} render={() => <CreateForm/>}/>
            <Switch>
              <Route exact path="/" render={() => (
                  <Redirect to="/articles?page=1"/>
              )}/>
              <Route path="/articles" component={Index} history={history}/>
              <Route component={NotFound}/>
            </Switch>
          </React.Fragment>
      	</BrowserRouter>
        </div>
      </div>
    );    
  }
}

export default connect()(App);
