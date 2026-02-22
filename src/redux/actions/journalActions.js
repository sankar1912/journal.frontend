import axios from "axios"
import { getJournalFailure, getJournalRequest, getJournalSuccess, setSpecificJournal } from "../slices/journalSlice";
import { setMessage } from "../slices/notificationSlice";

export const getJournal =()=>async(dispatch)=>{
    dispatch(getJournalRequest())
    try{
    const res = await axios.get('/api/v1/journal/get');
    dispatch(getJournalSuccess(res.data.journalsDoc));
    dispatch(setMessage(res.data.message));
    }catch(err){
        dispatch(setMessage("Error occured"))
        dispatch(getJournalFailure(err.message));
    }
}

export const getJournalById = (id)=>async(dispatch)=>{
    dispatch(getJournalRequest())
    try{
        const res = await axios.get(`/api/v1/journal/get/${id}`);
        dispatch(setSpecificJournal(res.data.journalsDoc));
        dispatch(setMessage(res.data.message));
    }catch(err){
        dispatch(setMessage("Error occured"))
        dispatch(getJournalFailure(err.message));
    }
}



export const modifyJournal = (journalId, updatedData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/journal/update/${journalId}`, updatedData);
    dispatch(setMessage(res.data.message));
    dispatch(setSpecificJournal(res.data.journal));
  } catch (error) {
    dispatch(setMessage(error.response?.data?.message || 'Failed to update journal'));
  }
};
