import React, { useState, useEffect } from "react";
import axios from 'axios'
import {serverUrl, apiKey} from "../../config";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationDetails,
  getLocationForecastDetails,
} from "../../Store/Actions/WeatherActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import History from "../../@history"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

//Alert like Toast
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Favourite() {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false)
  const [favourites, setfavourites] = useState([

  ])
  const [open, setOpen] = React.useState(true);
  let err = useSelector(({ weather }) => weather.error);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    var a = [];
    a = JSON.parse(localStorage.getItem('session'))
    console.log("Data", a.length)
    a.map(item=>{
      const request = axios.get( `${serverUrl}/currentconditions/v1/${item.selectedId}?apikey=${apiKey}` )
      request.then((response) => {
 
            let data = {
              id: item.selectedId,
              name: item.selectedCity,
              temperature: response.data[0].Temperature.Imperial.Value +
              " " +
              "º" + response.data[0].Temperature.Imperial.Unit,
              status: response.data[0].WeatherText
            }
            setfavourites(favourites => favourites.concat(data))
          
      }
      ).catch(error => {
          console.log(error)
          
      })
    })

    }, [change]);

    const getFavDetail = (item) => {
  
      History.push('/home/' + item.id + "/" + item.name)
    }

  return (
    <div className="favourite">
        {
           err!=" "? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="error">{err}</Alert>
         </Snackbar>:''
         }
      {JSON.parse(localStorage.getItem('session')).length>0 ?
      <Grid container spacing={4}>
       {
         favourites.map(item=>{
           return  <Grid item lg={2} md={4} sm={6} xs={12} >
                      <div onClick={e=>getFavDetail(item)} className="fav-card">
                      <br />
                      <p style={{fontWeight:'bold', lineHeight:'20px'}}>{item.name}</p>
                      <h3>
                        {item.temperature}
                      </h3>
                      <h2>{item.status}</h2>
                    </div>
           </Grid>
          
         })
       }
        </Grid>
        :<center><p style={{fontSize:'40px'}}>Nothing To Show</p></center>}
    </div>
  );
}

export default Favourite;
