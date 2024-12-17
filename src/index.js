import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import usersReducer from "./redux/reducers/userReducer";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "localPersist",
  storage,
  whiteList: [""],
};

const rootReducer = combineReducers({
  users: usersReducer,
});
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
