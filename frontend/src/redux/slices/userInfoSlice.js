import { createSlice } from '@reduxjs/toolkit';

// --- 1. Load state from Local Storage ---
const loadStateFromLocalStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      const user = JSON.parse(userJson);
      return {
        isLoggedIn: true,
        user: user,
        token: token,
      };
    }
  } catch (e) {
    console.error("Could not load state from local storage", e);
  }
  // Return the default initial state if nothing is found or an error occurs
  return {
    isLoggedIn: false,
    user: null,
    token: null,
  };
};

// Use the function to set the initial state
const initialState = loadStateFromLocalStorage();

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // --- 2. Save state to Local Storage on login ---
      try {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      } catch (e) {
        console.error("Could not save state to local storage on login", e);
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;

      // --- 3. Clear Local Storage on logout ---
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (e) {
        console.error("Could not clear state from local storage on logout", e);
      }
    },
    setUserInfo: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };

        // Optionally, update Local Storage on user info change
        try {
          localStorage.setItem('user', JSON.stringify(state.user));
        } catch (e) {
          console.error("Could not update user in local storage", e);
        }
      }
    },
  },
});

export const { login, logout, setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;