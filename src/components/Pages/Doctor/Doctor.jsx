import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import StyledCard from "@/components/Card/Card";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PatientTable from "@/components/Tables/PatientTable";
import DoctorDashboard from "./DoctorDashboard";
import SettingsForm from "@/components/Form/SettingsForm";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Stepps from "@/components/Steps/Steps";
<<<<<<< HEAD
import TreatmentTable from "@/components/Tables/TreatmentTable";
=======
<<<<<<< HEAD
=======
import TreatmentTable from "@/components/Tables/TreatmentTable";
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)

const Doctor = () => {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const patientOperations = [
    {
      key: "1",
      label: "View",
      icon: <EyeOutlined />,
    },
  ];

  const handleClick = (e) => {
    navigate(`${e}/details`);
  };

  const renderSectionComponent = () => {
    if (
      location.pathname.endsWith(`/doctor/${username}/dashboard`) ||
      location.pathname.endsWith(`/doctor/${username}`)
    ) {
      return <DoctorDashboard />;
    } else if (location.pathname.endsWith(`/doctor/${username}/patients`)) {
      return (
        <PatientTable handleClick={handleClick} items={patientOperations} />
      );
    } else if (location.pathname.endsWith(`/doctor/${username}/settings`)) {
      return <SettingsForm username={username} />;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> e9e9aca (Completed Doctor Module)
    } else if (location.pathname.endsWith(`/doctor/${username}/treatment`)) {
      return (
        <TreatmentTable handleClick={handleClick} items={patientOperations} />
      );
<<<<<<< HEAD
=======
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
    }
  };

  const SidebarComponent = () => {
    return <Sidebar username={username} />;
  };
  const HeaderComponent = () => {
    return <Navbar name={username} />;
  };
  const SectionComponent = () => {
    return renderSectionComponent();
  };
  return (
    <PageWrapper
      SidebarComponent={SidebarComponent}
      HeaderComponent={HeaderComponent}
      SectionComponent={SectionComponent}
    />
  );
};

export default Doctor;
