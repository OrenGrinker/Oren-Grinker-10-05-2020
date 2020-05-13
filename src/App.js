import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Router, Route, Redirect } from "react-router-dom";
import history from './@history'
import store from "./Store/index";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import Favourite from "./Pages/Favourite";
import Switch from '@material-ui/core/Switch';
import "./App.css";

function App(props) {
  const [dark, setDark] = useState(false);
  const darkMode = (event) => {
   
    if(dark){
      setDark(false);
      var element = document.body;
      element.classList.toggle("dark-mode");
 
    }
    else
      {
        setDark(true);
        var element = document.body;
        element.classList.toggle("dark-mode");
 
      }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Navigation />
        <BrowserRouter>
          <Router history={history} >
            <Route exact path="/" component={Home} />
            <Route exact path="/home/:id/:name" component={Home} />
            <Route exact path="/favourites" component={Favourite} />
          </Router>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
