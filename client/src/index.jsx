import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/reset.css";
import store from "store/store";
import App from "components/App/App";
import FullScreenLoader from "components/FullScreenLoader/FullScreenLoader";
import * as serviceWorker from "./serviceWorker";
import "./i18n";
import { GlobalStyle } from "./index.styled";

const app = (
  <Provider store={store}>
    <GlobalStyle />
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById(`root`));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
