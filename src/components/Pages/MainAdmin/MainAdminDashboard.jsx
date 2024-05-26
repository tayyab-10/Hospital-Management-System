import React from "react";
import DoctorsTable from "../../Admin_Dashboard/DoctorsTable";
import Sidebar from "../../Sidebar/Sidebar";
import DataTable from "../../DataTable/DataTable";
import { columns, data } from "@/constants/constants";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import StyledCard from "../../Card/Card";
import { TeamOutlined } from "@ant-design/icons";
const MainAdminDashboard = () => {
  const { username } = useParams();
  return (
    <div className="">
      {/* Navbar */}
      <div className="">
        <Navbar name={username} imgUrl={null} />
      </div>

      {/* Doctors Table */}
      <div className="flex flex-col justify-center items-center gap-20">
        <StyledCard
          title="Total Patients"
          icon={<TeamOutlined style={{ fontSize: "32px" }} />}
        />
        <DoctorsTable />
      </div>
    </div>
  );
};

export default MainAdminDashboard;
