// import { useState } from "react";
import Home from "./pages/Home";
import Registers from "./pages/Registers";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";
import axiosbase from "./axiosconfig";
import Dashboard from "./pages/Dashboard";
import Question from "./pages/Question";
import Answercard from "./pages/Answercard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
export const Appstate = createContext();

function App() {
  const [user, setuser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function check() {
    try {
      const { data } = await axiosbase.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setuser(data);
      console.log(data);
    } catch (error) {
      console.log(error?.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    check();
  }, []);

  return (
    <Appstate.Provider value={{ user, setuser }}>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* <Route index element={<Navigate to="/home" />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Registers />} />
          <Route path="signup" element={<Registers />} />
          <Route path="question" element={<Question />} />
          <Route path="question/:questionid" element={<Answercard />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </Appstate.Provider>
  );
}

export default App;
