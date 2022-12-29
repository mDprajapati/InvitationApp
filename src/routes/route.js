import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Components/User/Login";
import Invitatoinlist from "../Components/InvitatonList/InvitationList";
function Routess() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/invitatoinlist" element={<Invitatoinlist />} />
      </Routes>
    </Router>
    </>
  );
}

export default Routess;
