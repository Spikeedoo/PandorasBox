import React from 'react';
import {
    Route,
    Switch,
    BrowserRouter as Router,
} from "react-router-dom";
import Chat from "./Chat";
import Home from "./Home";
import Stats from "./Stats";
import LoginRedirect from "./LoginRedirect";
import TokenCatcher from "./TokenRedirect";
import cookie from "react-cookies";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/chat">
                    { (cookie.load('token') != null) ? <Chat/> : <LoginRedirect/> }
                </Route>
                <Route path="/stats">
                    { (cookie.load('token') != null) ? <Stats/> : <LoginRedirect/> }
                </Route>
                <Route path="/token">
                    <TokenCatcher/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
