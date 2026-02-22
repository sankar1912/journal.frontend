"use client";
import { useRouter } from "next/navigation";
import { getAuthState } from "@/redux/slices/authSlice";
import { getJournalState } from "@/redux/slices/journalSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Unauthorized from "@/components/Unauthorized";

function ManageEditor({ children }) {
  const { selectedJournal, loading: journalLoading } =
    useSelector(getJournalState);
  const { auth, loading: authLoading } = useSelector(getAuthState);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!journalLoading && !authLoading) {
      if (!auth) {
        router.push("/signin");
      } else {
        const isEditorInChief =
          selectedJournal?.editorialBoard?.editorInChief?.some(
            (member) => member._id === auth._id
          );
        if (isEditorInChief) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      }
    }
  }, [selectedJournal, auth, journalLoading, authLoading, router]);

  if (journalLoading || authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Unauthorized />;
  }

  return <>{children}</>;
}

export default ManageEditor;
