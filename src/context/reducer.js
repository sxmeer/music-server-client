import * as actionTypes from './actionTypes';

export const initialState = {
  user: null,
  spotify: null,
  playing: false,
  item: null,
  accessToken: null,
  uri: null,
  searchString: '',
  searchMode: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state, user: action.payload
      }
    case actionTypes.SET_PLAYING:
      return {
        ...state,
        playing: action.payload,
      };
    case actionTypes.SET_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    case actionTypes.SET_ACCESS_TOKEN:
      return {
        ...state, token: action.payload
      }
    case actionTypes.SET_SPOTIFY:
      return {
        ...state,
        spotify: action.payload,
      };
    case actionTypes.SET_URI:
      return {
        ...state,
        uri: action.payload
      };
    case actionTypes.SET_SEARCH_MODE:
      return {
        ...state,
        searchMode: action.payload
      };
    case actionTypes.SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer;