"use client";
import { getJournalById } from "@/redux/actions/journalActions";
import { getJournalState } from "@/redux/slices/journalSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppNavigate } from "@/hooks/useAppNavigate";

function Initial({ id }) {
  const { selectedJournal, loading } = useSelector(getJournalState);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getJournalById(id));
  }, [dispatch, id]);
  const navigate = useAppNavigate();
  useEffect(() => {
    if (!loading && !selectedJournal) {
      navigate();
    }
  }, [loading, selectedJournal, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Manuscript ID: {id}</div>;
}

export default Initial;
