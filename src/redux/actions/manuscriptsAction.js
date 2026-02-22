import axios from "axios"
import { setMessage } from "../slices/notificationSlice";
import { setManuscriptsLoad, setManuscriptsSuccess, setSearch } from "../slices/manuscriptsSlice";

export const loadManuscripts =()=>async(dispatch)=>{
    try{
        dispatch(setManuscriptsLoad());
        const response = await axios.get('/api/v1/manuscripts/load');
        dispatch(setManuscriptsSuccess(response.data.manuscripts));
        dispatch(setMessage(response.data.message));
    }catch(err){
        dispatch(setMessage(err||"Failed to load manuscripts"));
    }
}


export const fetchNotVerifiedManuscripts = (journalId) => async (dispatch) => {
    try{
        dispatch(setManuscriptsLoad());
        const response = await axios.get(`/api/v1/${journalId}/manuscripts/submissions`);
        dispatch(setSearch(response.data.manuscripts));
        dispatch(setMessage(response.data.message));
    }catch(err){
        dispatch(setMessage(err||"Failed to load manuscripts"));
    }
}


export const makeApprove =(manuscriptId)=>async(dispatch)=>{
    try{
        dispatch(setManuscriptsLoad());
        const response = await axios.put(`/api/v1/${manuscriptId}/manuscripts/approve`);
        dispatch(setMessage(response.data.message));
    }catch(err){
        dispatch(setMessage(err||"Failed to load manuscripts"));
    }
}

export const makeReject =(manuscriptId)=>async(dispatch)=>{
    try{
        dispatch(setManuscriptsLoad());
        const response = await axios.put(`/api/v1/${manuscriptId}/manuscripts/reject`);
        dispatch(setMessage(response.data.message));
    }catch(err){
        dispatch(setMessage(err||"Failed to load manuscripts"));
    }
}