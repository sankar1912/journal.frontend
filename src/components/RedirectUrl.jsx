"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function RedirectUrl() {
  const router = useRouter();
  const { redirectUrl } = useSelector((state) => state.app);

  useEffect(() => {
    if (redirectUrl) {
      console.log("Redirecting to:", redirectUrl);
    }
  }, [redirectUrl, router]);

  return null;
}

export default RedirectUrl;
