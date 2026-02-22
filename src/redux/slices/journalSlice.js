import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    journals:[],
    loading:false,
    error:"",
    message:"",
    selectedJournal:{}
}

const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        createJournalRequest: (state, action) => {
            state.loading= true;
          },
          createJournalSuccess: (state, action) => {
            state.loading= false;
            state.journals = action.payload;
          },
          createJournalFailure: (state, action) => {
            state.loading= false;
            state.error = action.payload;
          },
          getJournalRequest: (state, action) => {
            state.loading= true;
          },
          getJournalSuccess: (state, action) => {
            state.loading= false;
            state.journals = action.payload;
          },
          getJournalFailure: (state, action) => {
            state.loading= false;
            state.error = action.payload;
          },
          updateJournalRequest: (state, action) => {
            state.loading= true;
          },
          updateJournalSuccess: (state, action) => {
            state.loading= false;
            state.journals = action.payload;
          },
          updateJournalFailure: (state, action) => {
            state.loading= false;
            state.error = action.payload;
          },
          deleteJournalRequest: (state, action) => {
            state.loading= true;
          },
          deleteJournalSuccess: (state, action) => {
            state.loading= false;
            state.journals = action.payload;
          },
          deleteJournalFailure: (state, action) => {
            state.loading= false;
            state.error = action.payload;
          },
          setSpecificJournal:(state,action)=>{
            state.loading = false
            state.selectedJournal = action.payload;
          }
    }
})

export const getJournalState = (state)=>state.journal;
export const getSelectedJournal = (state)=>state.journal.selectedJournal;

export const {createJournalRequest,createJournalSuccess,createJournalFailure,
    getJournalRequest,getJournalSuccess,getJournalFailure,updateJournalRequest,
    updateJournalSuccess,updateJournalFailure,deleteJournalRequest,deleteJournalSuccess,
    deleteJournalFailure, setSpecificJournal} = journalSlice.actions
export default journalSlice.reducer;