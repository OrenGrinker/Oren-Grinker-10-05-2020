import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationDetails,
  getLocationForecastDetails,
} from "../../Store/Actions/WeatherActions";
import Grid from "@material-ui/core/Grid";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function WeatherCard(props) {
  const dispatch = useDispatch();
  let currentCondition = useSelector(({ weather }) => weather.currentCondition);
  let forecast = useSelector(({ weather }) => weather.forecast);
  let selectedCity = props.selectedCity;
  let selectedId = props.selectedId;
 
 
  const [temperature, setTemp] = useState("");
  const [forecaseDetails, setForecast] = useState([]);
  const [favIcon, setFavIcon] = useState(false);
  let days = [];

  useEffect(() => {
    setFavIcon(false)
    if (currentCondition.length == 0) {
      // dispatch(getLocationForecastDetails(215854));
      // dispatch(getLocationDetails(215854));
      // currentCondition.map((item) => {
      //   setTemp(
      //     item.Temperature.Imperial.Value +
      //       " " +
      //       "º" +
      //       item.Temperature.Imperial.Unit
      //   );
      // });
    } else {
      currentCondition.map((item) => {
        setTemp(
          item.Temperature.Imperial.Value +
            " " +
            "º" +
            item.Temperature.Imperial.Unit
        );
      });
    }

    var a = [];
      // Parse the serialized data back into an aray of objects
      a = JSON.parse(localStorage.getItem('session'))|| [];
      // Push the new data (whether it be an object or anything else) onto the array
      a.map(item=>{
        if(item.selectedId==selectedId)
        setFavIcon(true)
      })

  }, [currentCondition]);

  const getDay = (index) => {
    let date = new Date();
    let day = date.getDay();

    for (let i = 0; i <= 4; i++) {
      switch (day) {
        case 1:
          days.push("Monday");
          break;
        case 2:
          days.push("Tuesday");
          break;
        case 3:
          days.push("Wednesday");
          break;
        case 4:
          days.push("Thursday");
          break;
        case 5:
          days.push("Friday");
          break;
        case 6:
          days.push("Saturday");
          break;
        case 7:
          days.push("Sunday");
          break;
      }
      if (day == 7) {
        day = 1;
      } else day++;
    }

    return days[index];
  };

  const setFav = () => {
    if (favIcon) {
      setFavIcon(false);
      var a = [];
      var filtered = [];
      // Parse the serialized data back into an aray of objects
      a = JSON.parse(localStorage.getItem('session')) || [];
      filtered = a.filter(item=>{
        return item.selectedId!=selectedId
      })
     
      localStorage.setItem('session', JSON.stringify(filtered));
      console.log("remove", JSON.parse(localStorage.getItem('session')))
    } 
    else {
      setFavIcon(true);
      let block = false;
      var a = [];
      // Parse the serialized data back into an aray of objects
      a = JSON.parse(localStorage.getItem('session')) || [];
      // Push the new data (whether it be an object or anything else) onto the array
      a.map(item=>{
        if(item.selectedId==selectedId)
        block = true;
      })
      if(!block){
        let data = {
          selectedCity,
          selectedId
        }
        a.push(data);
      }
     
      localStorage.setItem('session', JSON.stringify(a));
      console.log("add", JSON.parse(localStorage.getItem('session')))
    }
  };

  return (
    <div className="weather-card">
      <Grid container>
        <Grid item xs={6}>
          <div className="current-condition">
            <img
              className="weather-logo"
              src={require("../../Assets/Images/weather.png")}
            />
            <div>
              <p>{selectedCity}</p>
              <p>{temperature}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ textAlign: "right" }}>
            {favIcon ? (
              <FavoriteIcon color="primary" onClick={setFav} />
            ) : (
              <FavoriteBorderIcon color="primary" onClick={setFav} />
            )}
          </div>
        </Grid>
        {forecast.length>0?
        <Grid xs={12}>
          <div style={{marginLeft:'10%'}}   className="forecast">
            <Grid container spacing={3}>
             {forecast.map((item, index) => {
                return (
                  <Grid item xs={8} sm={6} md={4} lg={2}>
                    {" "}
                    <div className="fav-card">
                      <br />
                      <h2>{getDay(index)}</h2>
                      <h3>
                        {item.Temperature.Maximum.Value +
                          " " +
                          "º" +
                          item.Temperature.Maximum.Unit}
                      </h3>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
        :<center><p style={{fontSize:'40px'}}>Nothing To Show</p></center>}
      </Grid>
    </div>
  );
}

export default WeatherCard;
