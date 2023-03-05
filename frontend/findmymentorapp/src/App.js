import "./App.css";
import Navbar from "./components/NavBar";
import { CssBaseline } from "@mui/material";
import { APIProvider } from "./context/api-provider";
import { DarkModeProvider } from "./context/theme.context";

import CreateRoutes from "./services/CreateRoutes";

function App() {
  const routes = CreateRoutes();

  return (
    <APIProvider>
      <DarkModeProvider>
        <CssBaseline />
        <Navbar />
        {routes}
      </DarkModeProvider>
    </APIProvider>
  );
}

export default App;
