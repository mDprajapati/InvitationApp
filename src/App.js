import "./App.css";
import rootReducer from "./redux/root-reducer/root-reducer";
import { Provider } from "react-redux";
import Routess from "./routes/route";
import { createStore } from "redux";
import React from "react";
function App() {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <Routess />
    </Provider>
  );
}

export default App;
