"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store, persistor } from "@/store/store";
import Notification from "@/components/shared/Notification";
import "../styles/main.css";

const queryClient = new QueryClient();
export default function AppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (navigator.userAgent.indexOf("iphone") > -1) {
      document
        .querySelector("meta[name=viewport]")
        ?.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0");
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Notification />
          {children}
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
