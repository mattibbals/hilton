import { combineReducers } from 'redux';
import roomReducer from './roomReducer';
import guestReducer from './guestReducer';
export default combineReducers({
 guestReducer,
 roomReducer
});