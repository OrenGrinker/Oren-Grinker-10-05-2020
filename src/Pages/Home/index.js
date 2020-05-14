import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import {
  searchLocation,
  getLocationDetails,
  getLocationForecastDetails,
} from "../../Store/Actions/WeatherActions";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import WeatherCard from "../../Components/WeatherCard";
import { LinearProgress, Grid } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Home(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  let searchList = useSelector(({ weather }) => weather.searchList);
  let currentCondition = useSelector(({ weather }) => weather.currentCondition);
  let err = useSelector(({ weather }) => weather.error);

  const search = (e) => {
    if (e.target.value != "")
     dispatch(searchLocation(e.target.value));
  };

  const getResult = (option) => {
    return option.LocalizedName + ", " + option.Country.LocalizedName;
  };
 
  useEffect(() => {
   
    if (props.match.path != "/") {
      let id = props.match.params.id;
      let name = props.match.params.name;
      setSelected(name);
      setSelectedId(id);
      dispatch(getLocationForecastDetails(id));
      dispatch(getLocationDetails(id));
 
    }
    if (props.match.path == "/") {
      setLoading(true);
      setSelectedId(215854);
      setSelected("Tel Aviv");
      dispatch(getLocationForecastDetails(215854));
      dispatch(getLocationDetails(215854));
      setLoading(false);
      
    }
 
 
    // return function cleanUp(){
    //      setSelected("")
    //      setSelectedId(0)
    // }
  }, []);

  const setSelectedLocation = (id, name) => {
    console.log(id);
    setChange(true);
    setLoading(true);
    setSelectedId(id);
    setSelected(name);
    dispatch(getLocationForecastDetails(id));
    dispatch(getLocationDetails(id));
    setLoading(true);
  };

  return (
    <div className="home">
      <center>
       <Grid container>
         <Grid lg={12} item>
         <div className="search-wrapper">
         {
           err!=" "? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="error">{err}</Alert>
         </Snackbar>:''
         }
          <Autocomplete
            className="locationSearch"
            options={searchList}
            getOptionLabel={(option) => getResult(option)}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  id={option.Key}
                  value={option.LocalizedName}
                  onChange={(e) =>
                    setSelectedLocation(option.Key, option.LocalizedName)
                  }
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <div
                  id={option.Key}
                  name={option.LocalizedName}
                  onClick={(e) =>
                    setSelectedLocation(option.Key, option.LocalizedName)
                  }
                >
                  {getResult(option)}
                </div>
              </React.Fragment>
            )}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                onKeyUp={search}
                {...params}
                className="search"
                label="Search"
                placeholder="Search"
              />
            )}
          />
        </div>
         </Grid>
       </Grid>
      </center>
      {<WeatherCard selectedId={selectedId} selectedCity={selected} />}
    </div>
  );
}

export default Home;
