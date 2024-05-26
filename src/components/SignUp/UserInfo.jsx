import { userInfoInputs } from "@/constants/constants";
import React from "react";
import CommonInput from "../CommonInput/CommonInput";

const UserInfo = ({ data, handleChange, formType }) => {
  return (
    <div>
      {userInfoInputs.map((input, i) =>
        formType === "Login" && input.name === "confirmPassword" ? null : (
          <CommonInput
            key={i}
            label={input.label}
            name={input.name}
            type={input.type}
            validationFn={input.validationfn}
            data={data ? data : null}
            value={data?.[input.name]}
            // onChange={(value) => handleChange(input.name, value)}
            // handleChange={
            //   formType === "Login"
            //     ? (value) => handleChange(input.name, value)
            //     : handleChange
            // }
            handleChange={handleChange}
            style={{ height: "40px" }}
          />
        )
      )}
    </div>
  );
};

export default UserInfo;
