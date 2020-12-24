import {combineReducers} from 'redux'

  function userChanger(state = {user: {}}, action) {
    switch (action.type) {
      case 'CHANGE_USER':
        // console.log(state);
        return {user: action.newUser}
      default:
        return state;
    }
  }

export default combineReducers({
  userChanger
})
