import { combineReducers } from 'redux';
import userReducer from '../invitatoins/invitatoin.reducer';

const rootReducer = combineReducers({
      user: userReducer,
})

export default rootReducer;