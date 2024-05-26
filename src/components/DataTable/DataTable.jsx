import React from "react";
import {
  Table,
  Dropdown,
  Menu,
  Button,
  Space,
  message,
  Avatar,
  Tag,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ConfigProvider } from "antd";

const DataTable = ({ columns, data, handleClick, items }) => {
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleMenuClick = (e) => {
    if (!currentRecord) return;
    message.info(`"Click on menu item." ${currentRecord.Email}`);
    console.log("Record:", currentRecord);
    handleClick(currentRecord.Email);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const columnsWithActions = columns.map((col, index) => {
    if (col.dataIndex === "Gender") {
      return {
        ...col,
        title: "Gender",
        key: "gender",
        render: (_, record) => (
          <Space size="middle">
            <Tag color={record.Gender === "Male" ? "blue" : "pink"}>
              {record.Gender}
            </Tag>
          </Space>
        ),
      };
    }

    if (index === 0) {
      // If it's the first column, merge with Avatar
      return {
        ...col,
        title: "Name",
        key: "avatar",
        render: (_, record) => (
          <Space size="middle">
            <Avatar src={record.avatar} />
            {record[col.dataIndex]}
          </Space>
        ),
      };
    } else {
      return col;
    }
  });

  columnsWithActions.push({
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Dropdown
          menu={menuProps}
          trigger={["click"]}
          onOpenChange={(visible) => {
            if (visible) setCurrentRecord(record);
          }}
        >
<<<<<<< HEAD
          <Button type="link" size="large" className="bg-dry">
            <EllipsisOutlined style={{ fontSize: "24px", color: "black" }} />
=======
<<<<<<< HEAD
          <Button type="link" size="small">
            <EllipsisOutlined />
=======
          <Button type="link" size="large" className="bg-dry">
            <EllipsisOutlined style={{ fontSize: "24px", color: "black" }} />
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
          </Button>
        </Dropdown>
      </Space>
    ),
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
<<<<<<< HEAD
=======
<<<<<<< HEAD
            headerBg: "#f0f0f0",
=======
>>>>>>> e9e9aca (Completed Doctor Module)
            headerBg: "#f8f9fa",
            cellPaddingBlock: "30px",
            borderColor: "fafafa",
            rowHoverBg: "#f3f5f7",
<<<<<<< HEAD
=======
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
          },
        },
      }}
    >
      <div className="data-table-container">
        <Table
          columns={columnsWithActions}
          dataSource={data}
          pagination={true}
          bordered
          scroll={{ x: true }}
          sorter={true}
        />
      </div>
    </ConfigProvider>
  );
};

export default DataTable;
