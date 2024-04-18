import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import { Routes } from "react-router-dom";
import TopBar from "./components/topbar/TopBar.jsx";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import WritePost from "./pages/writepost/WritePost.jsx";
import Settings from "./pages/settings/Settings.jsx";
import OnePost from "./components/onepost/OnePost.jsx";
import { useContext } from "react";
import { Context } from "./context/Context.jsx";

export default function App() {
  const { user } = useContext(Context);
  return (
    <div>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route
            path="/writepost"
            element={user ? <WritePost /> : <Register />}
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Register />}
          />
          <Route path="/post/:postId" element={<OnePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
