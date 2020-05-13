import {
    SEARCH_RESULT,
    CURRENT_CONDITION,
    FORECAST,
    ERROR
  } from "../Actions/types";
  
  
  const initialState = {
      searchList:[],
      currentCondition: [],
      forecast: [],
      error: " "
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SEARCH_RESULT:
        return {
          ...state,
          searchList: action.payload
        };
        case CURRENT_CONDITION:
        return {
          ...state,
          currentCondition: action.payload
        };
        case FORECAST:
        return {
          ...state,
          forecast: action.payload
        };
        case ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  }