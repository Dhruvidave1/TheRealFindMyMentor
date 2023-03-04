import "./App.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { APIProvider } from "./context/api-provider";
import CreateRoutes from "./services/CreateRoutes";

function App() {
  const routes = CreateRoutes();

  return (
    <>
      <APIProvider>
        <Router>
          <Navbar />
          {routes}
        </Router>
      </APIProvider>
    </>
  );
}

export default App;
