"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setRedirectUrl } from "../redux/slices/appInfoSlice";

export function useAppNavigate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { redirectUrl } = useSelector((state) => state.app);

  const appNavigate = (url) => {
    if (!url) {
      router.push(redirectUrl || "/");
      return;
    }
    const fullPath =
      searchParams.toString() !== ""
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
    dispatch(setRedirectUrl(fullPath));
    router.push(url);
  };

  return appNavigate;
}
