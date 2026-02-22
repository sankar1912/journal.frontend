const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    totalManuscripts:0,
    loading:false,
    error:null,
    manuscripts:{
        recent:[],
        top:[],
        search:[]
    },
}

const manuscriptsSlice = createSlice({
    name:"manuscripts",
    initialState,
    reducers:{
        setManuscriptsLoad:(state)=>{
            state.loading=true;
        },
        setManuscriptsSuccess:(state, action)=>{
            state.loading=false;
            state.manuscripts = action.payload;
            // state.totalManuscripts= action.payload.length();
        },
        setManuscriptsFailure:(state, action)=>{
            state.error=action.payload;
            state.loading=false
        },
        setSearch:(state, action)=>{
            state.totalManuscripts= action.payload.total;
            state.manuscripts.search=action.payload;
            state.loading=false;
        }
    }
})



export const getManuscriptsState = (state)=>state.manuscripts;

export const {setManuscriptsFailure, setManuscriptsLoad, setManuscriptsSuccess, setSearch} = manuscriptsSlice.actions;
export default manuscriptsSlice.reducer;