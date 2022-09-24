import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import MainLayout from "../layouts/MainLayout";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { NotificationsProvider } from "@mantine/notifications";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
          }}
        >
          <NotificationsProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </NotificationsProvider>
        </MantineProvider>
      </Provider>
    </>
  );
}
