import { useGetAllPatientsQuery } from "@/redux/services/hmsApi";
import React from "react";
import { useEffect } from "react";
import { Avatar, Card } from "antd";
import { formatTimeToAmPm, sortDescending } from "@/utils/utils";
import { useState } from "react";

const RecentPatients = () => {
  const { data, isLoading, error, isSuccess } = useGetAllPatientsQuery(
    localStorage.getItem("Doctortoken")
  );

  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      const updatedData = sortDescending(data);
      setPatientData(updatedData);
    }
  }, [data]);
  return (
    <>
      {isSuccess && (
        <Card
          style={{
            width: 410,
          }}
          className="bg-white rounded-xl border-[1px]"
        >
          <h2 className="font-poppins mb-4">Recent Patients</h2>
          {console.log(patientData)}
          {patientData?.slice(0, 5).map((patient, i) => {
            return (
              <div
                key={i}
                className="flex flex-col mb-3 p-4 bg-white rounded-xl bo border-b-[1px] hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex gap-2">
                    <Avatar shape="square" size={32} />
                    <div className="flex flex-col">
                      <h2 className="text-[12px] font-poppins font-medium">
                        {patient["Full Name"]}
                      </h2>
                      <p className="text-xs text- text-gray-400">
                        {patient["Contact"]}
                      </p>
                    </div>
                  </div>
                  <p className="">{formatTimeToAmPm(patient["Visit Date"])}</p>
                </div>
              </div>
            );
          })}
        </Card>
      )}
    </>
  );
};

export default RecentPatients;
