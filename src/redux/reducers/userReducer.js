import {
  ADD_USER,
  DELETE_USER,
  GET_USERS,
  UPDATE_USER,
  LOGGED_USER,
} from "../actions/userActions";

const initialState = {
  users: [],
  auth: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case GET_USERS:
      return { ...state, users: action.payload };

    case LOGGED_USER:
      return { ...state, auth: action.payload };

    default:
      return state;
  }
};

export default usersReducer;
