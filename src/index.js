import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { hot } from "react-hot-loader"
import Home from "./Containers/Home"
import reducers from "./reducers"
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

const engine = createEngine('my-save-key')
const middleware = storage.createMiddleware(engine);
const reducer = storage.reducer(reducers)

const store = createStore(reducer, applyMiddleware(thunkMiddleware, middleware))

const load = storage.createLoader(engine);
load(store)
  .then((newState) => console.log('Loaded state', newState))
  .catch(() => console.log('Failed to load previous state'))

const WrappedHome = () => (
  <Provider store={store}>
    <Home />
  </Provider>
)

const HotHome = hot(module)(WrappedHome)
export default store

ReactDOM.render(<HotHome />, document.getElementById("home"))
