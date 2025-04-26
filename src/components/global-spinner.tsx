// components/global-spinner.tsx
"use client";

import { useLoading } from "./loading-context";
import { Loader2 } from "lucide-react";

const GlobalSpinner = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Loader2 className="h-10 w-10 text-white animate-spin" />
    </div>
  );
};

export default GlobalSpinner;
