import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { store } from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
