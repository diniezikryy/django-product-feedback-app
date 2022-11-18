import "../styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import store from "../../store";
import { checkAuth } from "../features/user";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
