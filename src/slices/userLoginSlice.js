import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let promiseLifeCycle = createAsyncThunk(
  "userLogin",
  async (userCredObj, thunkApi) => {
    //http post
    let response = await axios.post("/user/login", userCredObj);
    let data = response.data;
    if (data.message === "success") {
      //store token in local store
      localStorage.setItem("token", data.token);
      //return user
      return data.user;
    }

    //if creddentials are invalid
    if (
      data.message === "Invalid username" ||
      data.message === "Invalid password"
    ) {
    }
    return thunkApi.rejectWithValue(data);
  }
);

//create a slice
export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    user: {},
    isError: false,
    errMsg: "",
    isPending: false,
    isSuccess: false,
  },
  reducers: {
    //reducer function that changes state
    resetState: (state) => {
      state.user = {};
      state.isError = false;
      state.errMsg = "";
      state.isPending = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [promiseLifeCycle.pending]: (state, action) => {
      state.isPending = true;
    },
    [promiseLifeCycle.fulfilled]: (state, action) => {
      console.log("action object is fulfilled is", action);
      state.user = action.payload;
      state.isPending = false;
      state.isError = false;
      state.isSuccess = true;
      state.errMsg = "";
    },
    [promiseLifeCycle.rejected]: (state, action) => {
      console.log("action object is rejected is", action);
      state.isError = true;
      state.user = {};
      state.errMsg = action.payload.message;
      state.isSuccess = false;
      state.ispending = false;
    },
  },
});

export default userLoginSlice.reducer;
//action creator functions
export let { resetState } = userLoginSlice.actions;
