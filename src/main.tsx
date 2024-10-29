import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeContextProvider } from "./components/ThemeContext.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "dotenv";

createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeContextProvider>
);
