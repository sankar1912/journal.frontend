"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "@/redux/actions/authActions";
import { getAuthState } from "@/redux/slices/authSlice";
import { useAppNavigate } from "@/hooks/useAppNavigate";

export default function Verification({ token }) {
  const [status, setStatus] = useState("Click below to verify your account.");
  const [loading, setLoading] = useState(false);

  const { auth, error } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const navigate = useAppNavigate();

  const handleVerify = () => {
    if (!token) {
      setStatus("Invalid or missing token ❌");
      return;
    }

    setLoading(true);
    setStatus("Verifying account...");

    try {
      dispatch(verifyAccount(token));
    } catch (err) {
      setStatus("Verification failed ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      setStatus("Account Verified ✅ Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (error) {
      setStatus(error || "Verification failed ❌");
    }
  }, [auth, error, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl font-semibold text-center">{status}</h1>

      {!auth && (
        <button
          onClick={handleVerify}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Click to Verify"}
        </button>
      )}
    </div>
  );
}