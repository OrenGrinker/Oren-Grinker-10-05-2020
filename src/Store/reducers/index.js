import {combineReducers} from 'redux';
 
import weather from './weather.reducer';

const createReducer = (asyncReducers) =>
    combineReducers({
        weather,
        ...asyncReducers
    });

export default createReducer;