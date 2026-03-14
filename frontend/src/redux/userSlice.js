import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: [],   // ✅ always initialize arrays as []
    selectedUser:null,
    onlineUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelecteduser:(state,action) =>{
      state.selectedUser=action.payload;
    },
    setOnlineUsers: (state, action) => {
  state.onlineUsers = action.payload;
   }
  },
});

export const { setAuthUser, setOtherUsers,setSelecteduser ,setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;
