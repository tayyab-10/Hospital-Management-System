import React, { useEffect, useState } from "react";
import StyledCard from "@/components/Card/Card";
import { patientCards } from "@/constants/constants";
import { useGetAllPatientsQuery } from "@/redux/services/hmsApi";

const PatientsCards = () => {
  const { data } = useGetAllPatientsQuery(localStorage.getItem("Doctortoken"));

  const [patientsCount, setPatientsCount] = useState([]);
  const updatePatientsCount = async (patients) => {
    const todayCount = patients.filter(
      (patient) =>
        new Date(patient["Visit Date"]).toDateString() ===
        new Date().toDateString()
    ).length;
    const monthlyCount = patients.filter(
      (patient) =>
        new Date(patient["Visit Date"]).getMonth() === new Date().getMonth()
    ).length;
    const yearlyCount = patients.filter(
      (patient) =>
        new Date(patient["Visit Date"]).getFullYear() ===
        new Date().getFullYear()
    ).length;

    setPatientsCount([todayCount, monthlyCount, yearlyCount]);
  };

  useEffect(() => {
    if (data) {
      updatePatientsCount(data);
    }
  }, [data]);

  return (
    <div className="flex xl:flex-row flex-wrap sm:justify-start  mb-4 xl:gap-[20px] gap-4">
      {patientCards.map((patient, i) => (
        <StyledCard
          title={patient.label}
          Icon={patient.Icon}
          count={patientsCount[i]}
          key={i}
        />
      ))}
    </div>
  );
};

export default PatientsCards;
