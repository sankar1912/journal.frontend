"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "@/redux/actions/authActions";
import { getAuthState } from "@/redux/slices/authSlice";
import { useAppNavigate } from "@/hooks/useAppNavigate";

export default function Verification({ token }) {
  const [status, setStatus] = useState("Verifying...");
  const { auth } = useSelector(getAuthState);
  const router = useRouter();
  const dispatch = useDispatch();
  const navigagte = useAppNavigate();
  useEffect(() => {
    dispatch(verifyAccount(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (auth) {
      setStatus("Account Verified ✅");
      setTimeout(() => {
        navigagte("/");
      }, 2000);
    }
  }, [auth, router]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-xl font-semibold">{status}</h1>
    </div>
  );
}
