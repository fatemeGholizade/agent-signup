import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Pages from "./views/pages";
import { Provider } from "react-redux";
import store from "./redux/Store/index";
import "react-toastify/dist/ReactToastify.css";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import React from "react";
const persistor = persistStore(store);


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Pages />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);