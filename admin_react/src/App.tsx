import React from 'react';
import Admin from './Admin'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import "node_modules/video-react/dist/video-react.css";
import 'antd/dist/antd.less'
import './global.less'
import store from './redux';
function App() {
  return (
    <div className="App">
     <Provider store={store}>
      <BrowserRouter>
      <Switch>
            <Route path="/login"/>
            <Route path="/" component={Admin} />
          </Switch>
      </BrowserRouter>
     </Provider>
    </div>
  );
}

export default App;
