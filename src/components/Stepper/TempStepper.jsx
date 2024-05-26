import roleContext from "@/context/RoleContext/roleContext";
import React, { useContext } from "react";
import UserInfo from "../SignUp/UserInfo";
import PersonalInfo from "../SignUp/PersonalInfo";
import DoctorInfo from "../Doctor/DoctorInfo";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { Button, Form } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Mover from "./Mover";
import { useState } from "react";
import { useRegisterMutation } from "@/redux/services/hmsApi";
import { stepperOptions, users } from "@/constants/constants";
import alertContext from "@/context/AlertContext/alertContext";
const TempStepper = ({ handleInputChange }) => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});

  const { role, navigateBaseOnRole } = useContext(roleContext);
  const { showAlert } = useContext(alertContext);
  const credentials = { ...formValues, role };
  const handleInputChangeAndUpdateFields = (name, value) => {
    // Update formValues state
    updateFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // // Update data state
    // setData((prevData) => [...prevData, { [name]: value }]);
  };
  const components = ["UserInfo", "PersonalInfo"];
  const addComponent = () => {
    // let Comp = getComponents(role);
    switch (role) {
      case 3:
        components.push("DoctorInfo");
    }
  };
  const {
    currentStep,
    steps,
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    updateFormValues,
    getFormValues,
  } = useMultiStepForm(components);

  const componentsWithProps = components.map((Component, i) => (
    <Component data={getFormValues()} handleChange={updateFormValues} key={i} />
  ));

  const [
    registerMutation,
    {
      registerError: error,
      registerSuccess: isSuccess,
      registerLoading: isLoading,
    },
  ] = useRegisterMutation();

  const handleSignUp = async () => {
    try {
      // const dateValue = form.getFieldValue("date");
      // console.log(dateValue);
      //const validateFields = await form.validateFields();
      const fields = { ...formValues, role };
      const result = await registerMutation(fields);

      //console.log(credentials.gender);
      if (!result.error) {
        if (result.data) {
          localStorage.setItem(
            `${users[result.data.role - 1].name}token`,
            result.data.token
          );
          navigateBaseOnRole(role, formValues.username);
          showAlert(
            "success",
            HiOutlineCheck,
            "Hurrah!",
            "Regisered Successfully..."
          );
        }
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };
  // let validateFields = "";
  const handleSubmit = async () => {
    try {
      // Validate form fields
      console.log(credentials.gender || "red");
      // form.getFieldValue;
      nextStep();

      // Proceed with form submission
      if (isLastStep) handleSignUp();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const onFinish = (values) => {
    nextStep();
    console.log("Recieved Values" + values);
  };
  return (
    <Form
      name="registration"
      //   onFinish={onFinish}
      onFinish={handleSubmit}
      className="w-full"
      form={form}
    >
      {addComponent()}
      <Mover
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        curStep={currentStep}
        role={role}
      />
      {/* <div className="flex justify-between my-10">{currentStep}</div> */}
      <div className=" w-[100%]">{componentsWithProps[currentStep]}</div>
      <div className="flex justify-between">
        <Button
          onClick={previousStep}
          disabled={isFirstStep}
          icon={<ArrowLeftOutlined />}
        >
          Previous
        </Button>
        <Form.Item>
          <Button icon={<ArrowRightOutlined />} htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default TempStepper;
