// CommonInput.jsx
import { Form, Input, Select, DatePicker, Radio } from "antd";
const { Option } = Select;

import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { qualificationSpecializations } from "@/constants/constants";
const { TextArea } = Input;

const CommonInput = ({
  label,
  name,
  type,
  validationFn,
  options,
  handleChange,
  data,
  ...rest
}) => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(null);
  const [selectValues, setSelectValues] = useState([]);
  const setChange = (e) => {
    if (
      type === "text" ||
      type === "number" ||
      type === "password" ||
      type === "email" ||
      type === "radio"
    ) {
      handleChange(name, e.target.value);
    } else if (type === "select") {
      selectChange(e);
    } else {
      dateChange(e);
    }
  };
  const selectChange = (value) => {
    setSelectValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    handleChange(name, value);
  };

  const dateChange = (data, dateString) => {
    setDate(data);
    handleChange(name, data);
  };

  const validateField = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!data?.[name]) {
        reject("Please input your " + label + "!");
        setMessage("Please input your " + label + "!");
        setStatus("warning");
        return;
      } else if (!data && !value) {
        reject("Please input your " + label + "!");
        setMessage("Please input your " + label + "!");
        setStatus("warning");
        return;
      }
      if (
        name === "confirmPassword" &&
        !validationFn(data?.["password"], value)
      ) {
        reject("Password does not match" + "!");
        setMessage("Password does not match" + "!");
        setStatus("error");
        return;
      }
      if (
        name !== "confirmPassword" &&
        validationFn &&
        !validationFn(data?.[name])
      ) {
        reject("Invalid " + label + "!");
        setMessage("Invalid " + label + "!");
        setStatus("error");
        return;
      }
      setStatus("success");
      setMessage("Success " + label + "!");
      resolve();
    });
  };
  const getIcon = (validateStatus) => {
    switch (validateStatus) {
      case "success":
        return <CheckCircleOutlined />;
      case "warning":
        return <WarningOutlined />;
      case "error":
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const renderInput = () => {
    switch (type) {
      case "text":
      case "password":
      case "email":
      case "number":
        return (
          <Input
            type={type}
            suffix={getIcon(status)}
            {...rest}
            onChange={setChange}
          />
        );
      case "date":
        return (
          // <DatePicker {...rest} format="YYYY-MM-DD" />
          <DatePicker {...rest} onChange={setChange} />
        );
      case "select": {
        return (
          <Select {...rest} onChange={setChange}>
            {/* // <Select {...rest}> */}
            {name === "qualification"
              ? options.map((option, i) => (
                  <Option key={i} value={option.qualification}>
                    {option.label}
                  </Option>
                ))
              : options.map((option, i) => (
                  <Option key={i} value={option}>
                    {option.label}
                  </Option>
                ))}
          </Select>
        );
      }
      case "textarea": {
        return <TextArea rows={4} onChange={setChange} />;
      }
      case "radio": {
        return (
          <Radio.Group onChange={setChange}>
            {name === "gender" ? (
              <>
                <Radio value="5"> Male </Radio>
                <Radio value="6"> Female </Radio>
              </>
            ) : (
              <>
                <Radio value="7"> Alive </Radio>
                <Radio value="8"> Dead </Radio>
              </>
            )}
          </Radio.Group>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="">
      <Form.Item
        name={name}
        validateStatus={status}
        rules={[
          {
            validator: validateField,
          },
        ]}
      >
        <div className="flex flex-col">
          <div
            // style={{ marginBottom: 8, fontSize: "20px" }}
            className="font-md font-poppins mb-4 text-lg"
          >
            {label}
          </div>
          {renderInput()}
        </div>
      </Form.Item>
    </div>
  );
};

export default CommonInput;
