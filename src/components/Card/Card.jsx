import { Card } from "antd";
import React from "react";
import { TeamOutlined } from "@ant-design/icons";
const StyledCard = ({ title, Chart, Icon, count }) => (
  <Card
    style={{
      width: 487,
    }}
    className="bg-white rounded-xl border-[1px]"
  >
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-4 justify-start items-start">
        <h2 className="text-base font-medium">{title}</h2>
        <h2 className="text-xl font-medium">{count}</h2>
        <p className="">
          Total Patients {count} {title === "Today Patients" ? "" : " this "}
          {title.split(" ")[0].toLowerCase().includes("ly")
            ? title.split(" ")[0].toLowerCase().slice(0, -2)
            : title.split(" ")[0].toLowerCase()}
        </p>
      </div>
      <div className="w-10 h-10 flex flex-col items-center justify-center bg-opacity-10 rounded-md text-yellow-500 bg-yellow-500">
        {<Icon style={{ fontSize: "16px" }} />}
      </div>
    </div>
    {Chart}
  </Card>
);

export default StyledCard;
