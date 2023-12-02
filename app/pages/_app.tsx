import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { store, persistor } from "@/store/store";
import "../styles/main.css";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const Notification = dynamic(import("@/components/shared/Notification"), { ssr: false });
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Notification />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
