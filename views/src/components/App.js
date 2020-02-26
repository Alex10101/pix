import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import Index from './Index';
// import NotFound from './NotFound';
import AppForm from './AppForm'
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
          <Route path="/articles/:id/edit" exact render={ (props) => <AppForm {...props} /> }/>
          <Route path="/articles/create" exact render={(props) => <AppForm {...props} />}/>
          <Route path="/" component={Index} history={history}/>
        </React.Fragment>
    	</BrowserRouter>
      </div>
    </div>
  );    
}

export default App;
