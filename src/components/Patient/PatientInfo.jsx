import { personalInfoInputs } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";
import { Form } from "antd";
import { petientInfoInputs } from "@/constants/constants";

const PatientInfo = ({ data, handleChange }) => {
  return (
    <div>
      {petientInfoInputs.map((input) => (
        <CommonInput
          key={input.value}
          label={input.label}
          name={input.name}
          type={input.type}
          validationFn={input.validationfn}
          value={data?.[input.name]}
          data={data}
          // onChange={(value) => handleChange(input.name, value)}
          handleChange={handleChange}
          style={{ height: "40px" }}
        />
      ))}
    </div>
  );
};

export default PatientInfo;
