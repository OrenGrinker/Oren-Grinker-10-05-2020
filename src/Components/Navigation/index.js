import React, { useState } from "react";
import History from '../../@history';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Switch from '@material-ui/core/Switch';

//Pages buttons
const children = [
  <ToggleButton key={1} value="home">
    Home
  </ToggleButton>,
  <ToggleButton key={2} value="fav">
    Favourites
  </ToggleButton>,
];


function Navigation(props) {
  //Declare state variable for Hook
  //alignment - current state value
  //setAlignment - function that update the state
  //Same for dark and setDark
  const [alignment, setAlignment] = React.useState("home");
  const [dark, setDark] = useState(false);
  const handleChange = (event, newAlignment) => {
    console.log(newAlignment)
    setAlignment(newAlignment);
    if(newAlignment=="home"){
      History.push("/")
    }
    else if(newAlignment=="fav") {
      History.push("/favourites")
    }
  };

  //Make the theme Dark Mode
  const darkMode = (event) => {
    if(dark){
      setDark(false);
      var element = document.body;
      element.classList.toggle("dark-mode");
      var searchField = document.getElementsByClassName("locationSearch")[0];
      searchField.classList.toggle("dark-mode-search");
    }
    else
      {
        setDark(true);
        var element = document.body;
        element.classList.toggle("dark-mode");
        var searchField = document.getElementsByClassName("locationSearch")[0];
        searchField.classList.toggle("dark-mode-search");
      }
  };

  return (
    <div >
      <Grid className="nav" container >
        <Grid item xs={6}>
          <h2 style={{marginTop:'10px', color:"#1a75ff"}}>Weather Checker APP</h2>
        </Grid>
        <Grid style={{textAlign:'right', marginTop:'10px'}} item xs={6}>
        <Switch
            className="dark-mode-switch"
            checked={dark}
            onChange={darkMode}
            name="checkedB"
            color="primary"
          />
          <Button style={{ marginRight:'10px'}} variant="contained" color="primary"  onClick={e=>History.push("/")}>
            Home
          </Button>
          <Button style={{ marginRight:'10px'}} variant="contained" color="secondary" onClick={e=>History.push("/favourites")}>
            Favourites
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Navigation;
