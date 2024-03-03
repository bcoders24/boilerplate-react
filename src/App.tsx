import Loader from "src/components/common/Loader/Loader";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Routes from "src/routes/Routing";
import { useState } from "react";
import { theme } from "./theme";
import { Provider } from "react-redux";
import store from "store/store";
import { Notification } from "./components/common/Notification/Notification";

const App = () => {
  const [isLoading, setIsloading] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Notification />
          <Routes />
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
