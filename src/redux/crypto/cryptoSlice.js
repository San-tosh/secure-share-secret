import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isFetching: false,
   error: false,
   token: ''
}

export const cryptoSlice = createSlice({
    name: 'cryptoSlice',
    initialState,
    reducers: {
      generateLinkStart: (state) => {
        state.isFetching = false;
        state.error = false;
      },
      generateLinkSuccess: (state,action) => {
        state.isFetching = false;
        state.token = action.payload;
      },
      generateLinkFailure: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      tokenValidStart: (state) => {
        state.isFetching = false;
        state.error = false;
      },
      tokenValidSuccess: (state,action) => {
        state.isFetching = false;
        state.token = action.payload;
      },
      tokenValidFailure: (state) => {
        state.isFetching = true;
        state.error = false;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { generateLinkStart, generateLinkSuccess, generateLinkFailure,
            tokenValidStart,tokenValidFailure,tokenValidSuccess
  } = cryptoSlice.actions
  
  export default cryptoSlice.reducer