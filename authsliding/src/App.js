import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from './componenets/Authentication/Auth';
import Dashboard from "./componenets/dashboard/Dashboard";
import { createContext, useState } from "react";


export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} /> */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
