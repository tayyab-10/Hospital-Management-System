import { personalInfoInputs } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";
import { Form } from "antd";
import FileUploader from "./FileUploader";

const PersonalInfo = ({ data, handleChange }) => {
  return (
    <div>
      {/* <FileUploader /> */}
      {personalInfoInputs.map((input) => (
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

export default PersonalInfo;
