import React, { createContext, useEffect } from "react";
import { useSessionStorageState } from "../hooks/useSessionStorageState";

const API_URL = "http://localhost:4000/api/";

export const APIContext = createContext();

export function APIProvider(props) {
  const [jwt, setJwt] = useSessionStorageState("jwt", null);
  const [userId, setUserId] = useSessionStorageState("userId", null);

  useEffect(() => {}, []);

  async function login(email, password) {
    // Send credentials to server and save the token from the response
    try {
      const response = await fetch(API_URL + "user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const body = await response.json();
      if (response.ok) {
        // Set the token in session storage for use in later API calls
        const { token, _id } = body;
        setJwt(token);
        setUserId(_id);
        return true;
      } else return body;
    } catch (e) {
      console.log(e);
      return "Server communication error";
    }
  }

  function isLoggedIn() {
    return jwt != null;
  }

  async function getUserInfo() {
    try {
      const response = await fetch(API_URL + "user/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      if (body.success === true) {
        console.log(body);
        return body;
      } else return body;
    } catch (e) {
      console.log(e);
      return "Server communication error";
    }
  }

  function logout() {
    setJwt(null);
    setUserId(null);
  }

  async function register(registrationData) {
    // Send credentials to server and save the token from the response
    try {
      const response = await fetch(API_URL + "user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
      const body = await response.json();

      if (body.success) {
        return true;
      } else return body.message;
    } catch (e) {
      console.log(e);
      return "Server communication error";
    }
  }

  async function getMatches() {
    try {
      const response = await fetch(API_URL + "matches", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      if (body.success === true) {
        console.log(body);
        return body;
      } else return body;
    } catch (e) {
      console.log(e);
      return "Server communication error";
    }
  }

  return (
    <APIContext.Provider
      value={{
        login,
        isLoggedIn,
        jwt,
        logout,
        register,
        getMatches,
        getUserInfo,
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
}
