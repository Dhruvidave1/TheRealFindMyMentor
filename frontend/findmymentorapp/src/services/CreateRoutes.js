import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { APIContext } from "../context/api-provider";
import LogIn from "../pages/SignIn";
import DashBoard from "../pages/Dashboard.js";
import Match from "../pages/Match";
import Signup from "../pages/SignUp";
import Summary from "../pages/Summary";
import ViewProfile from "../pages/ViewProfile";

// check to ensure we are logged in before navigating to a private page
function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(APIContext);
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

// don't allow navigation to the certain pages if user is already authenticated
function AnonymousRoute({ children }) {
  const { isLoggedIn } = useContext(APIContext);
  return isLoggedIn() ? <Navigate to="/" /> : children;
}

function CreateRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          <AnonymousRoute>
            <LogIn />
          </AnonymousRoute>
        }
      />
      <Route
        exact
        path="/signup"
        element={
          <AnonymousRoute>
            <Signup />
          </AnonymousRoute>
        }
      />
      <Route
        exact
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/match"
        element={
          <PrivateRoute>
            <Match />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/summary"
        element={
          <PrivateRoute>
            <Summary />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/viewprofile"
        element={
          <PrivateRoute>
            <ViewProfile />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Match />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
export default CreateRoutes;
