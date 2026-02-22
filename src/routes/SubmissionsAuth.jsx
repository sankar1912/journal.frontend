"use client"
import Unauthorized from '@/components/Unauthorized';
import { getAuthState } from '@/redux/slices/authSlice';
import { getJournalState } from '@/redux/slices/journalSlice';
import React from 'react';
import { useSelector } from 'react-redux';

function SubmissionsAuth({journal, children}) {
    const {auth, loading:authLoading} =useSelector(getAuthState);
    const {selectedJournal, loading:journalLoading}=useSelector(getJournalState);
    if(authLoading || journalLoading){
        return <div>Loading...</div>
    }
    if(!auth){
        return <Unauthorized/>
    }
    if(!selectedJournal){
        return <div>Journal not found</div>
    }
  return <>{children}</> ;
}

export default SubmissionsAuth;
