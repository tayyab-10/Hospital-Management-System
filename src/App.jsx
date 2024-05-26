import { Route, Routes, useNavigate, useParams } from "react-router-dom";
// import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import AlertState from "./context/AlertContext/AlertState";
import AlertDialog from "./components/Alert/AlertDialog";
import RoleState from "./context/RoleContext/RoleState";
import { doctorOptions, userComponents, users } from "./constants/constants";
import MainAdminDashboard from "./components/Pages/MainAdmin/MainAdminDashboard";
import Doctor from "./components/Pages/Doctor/Doctor";
import DoctorsTable from "./components/Admin_Dashboard/DoctorsTable";
import Navbar from "./components/Navbar/Navbar";
const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { username } = useParams();
  return (
    <AlertState>
      <RoleState>
        <AlertDialog />
        <Routes>
          {["/login", "/"].map((path, index) => (
            <Route path={path} key={index} element={<Login />} />
          ))}
          {users.map((user) => {
            const userName = user.name.replace(" ", "");
            const smallUserName = userName.toLowerCase();
            const CapitalizedUserName = userComponents[smallUserName];
            return (
              <Route
                key={user.name}
                path={`/${smallUserName}/:username`}
                element={<CapitalizedUserName />}
              />
            );
          })}
          {doctorOptions.map((option, i) => (
            <Route
              key={i}
              path={`/doctor/:username/${option.label.toLowerCase()}`}
              element={<Doctor />}
            />
          ))}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </RoleState>
    </AlertState>
  );
};

export default App;
