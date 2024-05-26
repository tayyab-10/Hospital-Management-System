import React from "react";
import DoctorsTable from "../../Admin_Dashboard/DoctorsTable";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import StyledCard from "../../Card/Card";
import { TeamOutlined } from "@ant-design/icons";
import PatientTable from "@/components/Tables/PatientTable";
import PatientsCards from "./PatientsCards";
import RecentPatients from "./RecentPatients";
import TodayAppointments from "./TodayAppointments";
const DoctorDashboard = () => {
  return (
    <div className="">
      <PatientsCards />
      {/* <PatientTable /> */}
      <div className="flex flex-wrap gap-8">
        <RecentPatients />
        <TodayAppointments />
      </div>
    </div>
  );
};

export default DoctorDashboard;
