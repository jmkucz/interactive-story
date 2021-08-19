import React from "react"
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./Login"
import Home from "./Home"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { applyMiddleware, createStore } from "redux"
import thunk from 'redux-thunk'
import generalReducer from "../reducers/general.reducer"

const App = () => {
  const store = createStore(generalReducer, composeWithDevTools(applyMiddleware(thunk)))

  return (
    <Provider store={store} >
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/home" component={Home} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
