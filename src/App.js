import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store'
//import Content from './bkpractical/tutorails_1'
import Dashboard from './bkpractical/dashboard'
import WADesign from './bkpractical/waDesign'
import FBdesign from './bkpractical/fbDesign'
import reduxTutorials from './bkpractical/reduxtutorials'
import MemoRef from './bkpractical/memoRef'
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/waDesign" component={WADesign} />
          <Route exact path="/fbDesign" component={FBdesign} />
          <Route exact path="/MemoRef" component={MemoRef} />
          <Provider store={store}>
          <Route exact path="/reduxTutorials" component={reduxTutorials} />
          </Provider> 
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
