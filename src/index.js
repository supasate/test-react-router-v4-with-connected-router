import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, connectRouter, routerMiddleware, push } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { Route, Link, Switch } from 'react-router-dom'

const history = createBrowserHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  connectRouter(history)(combineReducers({
    test: (state, action) => ('test'),
  })),
  composeEnhancer(
    applyMiddleware(routerMiddleware(history))
  )
)

const Home = () => (
  <div>
    Home
    <button onClick={() => store.dispatch(push('/topics/components'))}>Jump</button>
  </div>
)

const About = () => (
  <div>
    About
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>
    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const NotFound = () => (
  <div>Not Found</div>
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

        <hr/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
