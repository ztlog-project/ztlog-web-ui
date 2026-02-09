import "./styles/Styles.css";
import "./styles/DarkMode.css";
import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "./store";
import { BrowserRouter } from "react-router-dom";
import { ResponsiveProvider, ThemeProvider } from "./contexts";
import RouteSetup from "./routes/RouteSetup";

export default function App() {
  const store = useStore();
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ResponsiveProvider>
          <BrowserRouter>
            <RouteSetup />
          </BrowserRouter>
        </ResponsiveProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
