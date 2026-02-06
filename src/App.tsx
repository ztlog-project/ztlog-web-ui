import "./styles/Styles.css";
import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "./store";
import { BrowserRouter } from "react-router-dom";
import { ResponsiveProvider } from "./contexts";
import RouteSetup from "./routes/RouteSetup";

export default function App() {
  const store = useStore();
  return (
    <ReduxProvider store={store}>
      <ResponsiveProvider>
        <BrowserRouter>
          <RouteSetup />
        </BrowserRouter>
      </ResponsiveProvider>
    </ReduxProvider>
  );
}
