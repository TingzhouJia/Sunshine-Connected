import React from 'react';
import Admin from './Admin'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react'
import 'antd/dist/antd.less'
import './global.less'
import store,{persistor} from './redux';
function App() {
  return (
    <div className="App">
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <Switch>
            <Route path="/login"/>
            <Route path="/" component={Admin} />
          </Switch>
      </BrowserRouter>
      </PersistGate>
      
     </Provider>
    </div>
  );
}

export default App;
