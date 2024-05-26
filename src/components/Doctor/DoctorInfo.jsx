import React from "react";
import {
  doctorInputs,
  qualificationSpecializations,
} from "@/constants/constants";
import { getSpecializations } from "@/utils/utils";
import { useState } from "react";
import CommonInput from "../CommonInput/CommonInput";
const DoctorInfo = ({ data, handleChange }) => {
  const [qualification, setQualification] = useState(
    qualificationSpecializations[0].qualification
  );

  const handleQualificationChange = (value) => {
    setQualification(value);
  };

  const handleInputChange = (name, value) => {
    handleChange(name, value);
    if (name === "qualification") {
      handleQualificationChange(value);
    }
  };
  return (
    <div>
      {doctorInputs.map((input) => {
        const options =
          input.name === "qualification"
            ? qualificationSpecializations
            : qualification
            ? getSpecializations(qualification).specializations || []
            : [];
        return (
          <CommonInput
            key={input.value}
            label={input.label}
            name={input.name}
            type={input.type}
            options={options}
            value={data?.[input.name]}
            // onChange={(value) => handleInputChange(input.name, value)}
            handleChange={handleInputChange}
            style={{ height: "40px" }}
          />
        );
      })}
    </div>
  );
};

export default DoctorInfo;
