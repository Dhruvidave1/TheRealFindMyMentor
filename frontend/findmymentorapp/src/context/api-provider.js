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
      console.log(body);
      if (body.success === true) {
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

  async function register(
    firstName,
    lastName,
    email,
    password,
    biography,
    workLocation,
    isMentor,
    isMentee,
    yearsOfPractice,
    designation,
    zone,
    areaPractice,
    skills,
    areasInterest,
    mentorshipGoals
  ) {
    // Send credentials to server and save the token from the response
    try {
      const response = await fetch(API_URL + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          biography: biography,
          workLocation: workLocation,
          isMentor: isMentor,
          isMentee: isMentee,
          yearsOfPractice: yearsOfPractice,
          designation: designation,
          zone: zone,
          areaPractice: areaPractice,
          skills: skills,
          areasInterest: areasInterest,
          mentorshipGoals: mentorshipGoals,
        }),
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
