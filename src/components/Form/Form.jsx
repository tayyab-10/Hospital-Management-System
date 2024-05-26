import { Form, Input, Button, message } from "antd";
import { userInfoInputs, users } from "@/constants/constants";
import { useContext, useState } from "react";
import roleContext from "@/context/RoleContext/roleContext";
import Role from "../Role/Role";
import { useLoginMutation } from "@/redux/services/hmsApi";
import alertContext from "@/context/AlertContext/alertContext";
import UserInfo from "../SignUp/UserInfo";
import TempStepper from "@/components/Stepper/TempStepper";
import { HiOutlineCheck } from "react-icons/hi";
import logo from "@/assets/logo.png";
import Stepper from "../Stepper/Stepper";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
const Frm = ({ formType }) => {
  const { role, navigateBaseOnRole } = useContext(roleContext);
  const { showAlert } = useContext(alertContext);
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const component = [UserInfo];
  const { getFormValues, updateFormValues } = useMultiStepForm(component);

  const componentsWithProps = component.map((Component, i) => (
    <Component
      data={getFormValues()}
      handleChange={updateFormValues}
      key={i}
      formType="Login"
    />
  ));
  const [
    loginMutation,
    { isLoading: isLoginLoading, error: loginError, isSuccess: isLoginSuccess },
  ] = useLoginMutation();
  const form = Form.useFormInstance();
  const vals = getFormValues();
  const handleLogin = async () => {
    try {
      // const values = await form.validateFields();
      // if (values) {
      const credentials = { ...vals, role };
      // const credentials = { ...values, role };
      console.log(credentials);
      const result = await loginMutation(credentials);
      console.log(result.data);
      if (!result.error) {
        if (result.data) {
          localStorage.setItem(
            `${users[role - 1].name}token`,
            result.data.token
          );
          navigateBaseOnRole(role, vals["username"]);
          showAlert(
            "success",
            HiOutlineCheck,
            "Hurrah!",
            "Logged In Successfully..."
          );
        }
      }
      // }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Role />
      <img src={logo} className="h-20 mt-4 border-2 rounded-full" />
      {formType === "Register" && (
        <div>
          {/* <TempStepper handleInputChange={handleInputChange} /> */}
          <Stepper handleInputChange={handleInputChange} />
        </div>
      )}

      {formType === "Login" && (
        <Form
          name="login"
          onFinish={handleLogin}
          className="w-full px-20"
          form={form}
        >
          {/* <UserInfo handleChange={handleInputChange} formType="Login" /> */}
          {componentsWithProps[0]}
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit" size="large">
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default Frm;
