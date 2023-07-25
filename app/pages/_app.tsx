import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/client";
import client from "@/helpers/apolloClient";
import Notification from "@/components/Notification";
import type { AppProps } from "next/app";
import { store, persistor } from "../store/store";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Notification />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
