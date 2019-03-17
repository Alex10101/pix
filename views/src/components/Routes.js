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
      		<Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/articles?page=1&limit=10"/>
            )}/>
            <Route path="/articles/:id/edit" exact history={history}
              render={ (props) => <CreateForm article={ props.location.article || false }/> }
            />
            <Route path="/articles/create" exact component={CreateForm} history={history}/>
      			<Route path="/articles" exact component={Index} history={history}/>
      			<Route path="*" component={NotFound}/>
      		</Switch>
      	</BrowserRouter>
        </div>
      </div>
    );    
  }
}

export default connect()(App);
