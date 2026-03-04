"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/context/AuthContext";
import { ThemeProvider } from "@/lib/context/ThemeProvider";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
