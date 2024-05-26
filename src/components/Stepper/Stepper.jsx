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
import { HiOutlineCheck } from "react-icons/hi";
import PatientInfo from "../Patient/PatientInfo";
const Stepper = ({ handleInputChange }) => {
  const [form] = Form.useForm();
  const { role, navigateBaseOnRole } = useContext(roleContext);
  const { showAlert } = useContext(alertContext);
  const components = [UserInfo, PersonalInfo];
  const addComponent = () => {
    // let Comp = getComponents(role);
    switch (role) {
      case 4:
        components.push(PatientInfo);
      case 3:
        components.push(DoctorInfo);
    }
  };
  addComponent();
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
  console.log(componentsWithProps);
  const [
    registerMutation,
    {
      registerError: error,
      registerSuccess: isSuccess,
      registerLoading: isLoading,
    },
  ] = useRegisterMutation();
  const data = getFormValues();
  const handleSignUp = async () => {
    const fields = { ...data, role };
    try {
      const result = await registerMutation(fields);
      if (!result.error) {
        if (result.data) {
          localStorage.setItem(
            `${users[role - 1].name}token`,
            result.data.token
          );
          navigateBaseOnRole(role, data["username"]);
          showAlert(
            "success",
            HiOutlineCheck,
            "Hurrah!",
            "Regisered Successfully..."
          );
        }
      } else {
        console.log(result.error.data.msg); // Throw an error if result has an error
        throw new Error(result.error.data.msg);
      }
    } catch (error) {
      console.error("Form validation failed:", error.message);
      showAlert("error", HiOutlineCheck, "Failed!  ", `${error.message}`);
    }
  };
  const handleSubmit = async () => {
    try {
      nextStep();
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
          <Button
            icon={isLastStep ? null : <ArrowRightOutlined />}
            htmlType="submit"
            className={isLastStep ? "flex justify-center" : ""}
          >
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default Stepper;
