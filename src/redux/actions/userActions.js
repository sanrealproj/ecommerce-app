import axios from "axios";

// actions.js
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const GET_USERS = "GET_USERS";
export const LOGGED_USER = "LOGGED_USER";

export const addUserAction = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId,
});

export const logUser = (user) => ({
  type: LOGGED_USER,
  payload: user,
});

// export const getUsersAction = (users) => ({
//   type: GET_USERS,
//   payload: users,
// });

export const getUsers = (asin) => {
  return async (dispatch) => {
    const urlBlogs = `http://localhost:5000/users`;
    const res = await axios
      .get(urlBlogs)
      .then((response) => {
        dispatch({ type: GET_USERS, payload: response.data });
        return response.data;
      })
      .catch((error) => {
        return error.message;
      });
    return res;
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    const urlBlogs = `http://localhost:5000/users`;
    const res = await axios
      .post(urlBlogs, user)
      .then((response) => {
        dispatch(addUserAction(user));
        return response.data;
      })
      .catch((error) => {
        return error.message;
      });
    return res;
  };
};

export const editUsers = (user) => {
  return async (dispatch) => {
    const urlBlogs = `http://localhost:5000/users/${user.id}`;
    const res = await axios
      .put(urlBlogs, user)
      .then((response) => {
        dispatch(updateUserAction(user));
        if (user.roles === "user") {
          logUser(user);
        }
        return response.data;
      })
      .catch((error) => {
        return error.message;
      });
    return res;
  };
};

export const deleteUsers = (id) => {
  return async (dispatch) => {
    const urlBlogs = `http://localhost:5000/users/${id}`;
    const res = await axios
      .delete(urlBlogs)
      .then((response) => {
        dispatch(deleteUser(id));
        return response.data;
      })
      .catch((error) => {
        return error.message;
      });
    return res;
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    const url = `http://localhost:5000/users?email=${email}&password=${password}`;
    const res = await axios
      .get(url)
      .then((response) => {
        dispatch(logUser(response.data));
        return response.data;
      })
      .catch((error) => {
        return error.message;
      });
    return res;
  };
};
