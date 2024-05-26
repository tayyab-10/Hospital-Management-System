import { Avatar, Layout, Space } from "antd";
import { FaTrashAlt, FaUserAlt, FaUserEdit } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { UserOutlined } from "@ant-design/icons";

import PersonalInfo from "../SignUp/PersonalInfo";
import DragUpload from "../Form/DragUpload";
import DetailsWrapper from "../DetialsWrapper/DetailsWrapper";
const { Header, Sider, Content } = Layout;
const SettingsForm = ({
  username,
  avatar,
  email,
  phoneno,
  fullName,
  items,
}) => {
  const LeftComponent = () => {
    return (
      <>
        <Avatar size={128} icon={<UserOutlined />} />

        <h2 className="font-md text-lg ">{fullName} Full Name</h2>
        <div>
          <h2 className="font-md text-sm">{email} salman@gmail.com</h2>
        </div>
        <div>
          <p className="font-md text-base">{phoneno} +92 348 457821</p>
        </div>
        <div>Menu</div>
      </>
    );
  };

  const RightComponent = () => {
    return <PersonalInfo />;
  };
  return (
    <DetailsWrapper
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
};

export default SettingsForm;
