import { combineReducers, createStore } from "redux"
import UserReducer from "./UserReducer"

const store = createStore(
   combineReducers({
      user: UserReducer
   })
)

export default store