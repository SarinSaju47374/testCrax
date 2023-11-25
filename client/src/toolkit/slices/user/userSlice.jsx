import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"tutor",
    initialState:{
        user:null,
    },
    reducers:{
        loginTutor: (state,action)=>{   
            state.user = action.payload;
        },
        logoutTutor : (state)=>{
            state.user = null;
        },
        saveTempCourse: (state,action)=>{
            state.courseTempId = action.payload;
        },
        saveSlots:(state,action)=>{
            state.slots = action.payload;
        }
    }
})

export const {loginTutor,logoutTutor,saveTempCourse,saveSlots} = userSlice.actions;
export default userSlice.reducer