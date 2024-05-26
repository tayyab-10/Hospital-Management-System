import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { doctorOptions } from "../../constants/constants";
import logo from "../../assets/logo.png";
import { adminOptions } from "../../constants/constants";
const NavLinks = ({ username, handleClick }) => (
  <div className="my-5 ">
    {doctorOptions.map((option) => (
      <NavLink
        key={option.value}
        to={
          option.value === 8
            ? "/"
            : `/doctor/${username}/${option.label.toLowerCase()}`
        }
        className="my-8 font-medium flex flex-row items-center justify-start hover:text-cyan-400 text-white"
        onClick={() => handleClick && handleClick()}
      >
        <option.Icon className="w-6 h-6 mx-5 text-2xl" />
        {option.label}
      </NavLink>
    ))}
  </div>
);
const Sidebar = ({ username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Main Admintoken")) {
      console.log("Admin logged in");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="mt-20">
      <img
        src={logo}
        alt="header_logo"
        className="w-full object-contain h-14 "
      />
      {/* {NavadminOptions()} */}
      <NavLinks username={username} />
    </div>
  );
};

export default Sidebar;
