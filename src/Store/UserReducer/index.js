const initialState = {
   user: {
      uid: '',
      displayName: '',
      email: '',
      urlPhoto: '',
      isLogin: false
   }
}

const UPDATE_USER = 'UPDATE_USER'

const UserReducer = (state = initialState, action) =>{
   switch(action.type){
      case UPDATE_USER:
         return [...state, {...action.payload}]
      default:
         return state
   }
}

export default UserReducer