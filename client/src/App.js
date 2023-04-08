import { Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import EmailVerify from "./components/emailverification";
import Profile from "./components/profile";
import { Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem("token");
  return (
    
    <Routes>
      <Route path="/" exact element={<Signup />} />
      {< Route path="/login" exact element={<Login />} />}
      <Route path="/users/:id/verify/:token" element={< EmailVerify/>} />
      <Route
              path="/profile/:userId"
              element={user ? <Profile /> : <Navigate to="/" />}
            />
    </Routes>
  );
}

export default App;
