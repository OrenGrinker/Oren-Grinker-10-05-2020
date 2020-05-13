 
import axios from "axios";
import {serverUrl, apiKey} from "../../config";
import {SEARCH_RESULT, CURRENT_CONDITION, FORECAST, ERROR} from './types'


export function searchLocation(location) {
 
    const request = axios.get( `${serverUrl}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${location}` )
 
    return (dispatch) => (
        request.then((response) => {
           
            return dispatch({
                type: SEARCH_RESULT,
                payload: response.data
            })
        }
        ).catch(error => {
            console.log(error)
            
        })
    )
}

export function getLocationDetails(locationId) {
 
    const request = axios.get( `${serverUrl}/currentconditions/v1/${locationId}?apikey=${apiKey}` )
 
    return (dispatch) => (
        request.then((response) => {
            console.log(response)
            return dispatch({
                type: CURRENT_CONDITION,
                payload: response.data
            })
       
        }
        ).catch(error => {
          
            return dispatch({
                type: ERROR,
                payload: "Network Error"
            })
        })
    )
}

export function getLocationForecastDetails(locationId) {
 
    const request = axios.get( `${serverUrl}/forecasts/v1/daily/5day/${locationId}?apikey=${apiKey} ` )
 
    return (dispatch) => (
        request.then((response) => {
            return dispatch({
                type: FORECAST,
                payload: response.data.DailyForecasts
            })
        }
        ).catch(error => {
            console.log(error)
            
        })
    )
}

 
 

 