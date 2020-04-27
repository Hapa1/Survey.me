import { FETCH_PROFILE } from '../actions/types';
//DEFAULT state to empty array
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
