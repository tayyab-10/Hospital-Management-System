import { useGetAllPatientsQuery } from "@/redux/services/hmsApi";
import { useEffect } from "react";
import { Avatar, Card, Steps } from "antd";
import { formatTimeToAmPm, getDateDiff, isEqualToToday } from "@/utils/utils";
import Stepps from "@/components/Steps/Steps";
const { Step } = Steps;

const TodayAppointments = () => {
  const { data, isLoading, error, isSuccess } = useGetAllPatientsQuery(
    localStorage.getItem("Doctortoken")
  );
  const generateStepItems = (patients) => {
    return patients
      ?.slice(0, 5)
      .map((patient, index) => {
        if (isEqualToToday(patient["Visit Date"]) === true) {
          const hoursLeft = getDateDiff(patient["Visit Date"]);
          if (hoursLeft < 0) return null; // Skip if the appointment is already over
          const stepItem = {
            key: index,
            title: (
              <>
                <div className="mb-4 flex items-center justify-center">
                  <div className="ml-6">
                    <h2>{patient["Full Name"]}</h2>
                    <span>{formatTimeToAmPm(patient["Visit Date"])}</span>
                  </div>
                </div>
              </>
            ),
          };
          return { hoursLeft, stepItem };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null); // Filter out null items
  };

  const stepItems = generateStepItems(data);
  useEffect(() => {}, [data]);
  return (
    <>
      {isSuccess && (
        <Card
          style={{
            width: 410,
          }}
          className="bg-white rounded-xl border-[1px] mr-4"
        >
          <h2 className="font-poppins mb-6">Today Appointments</h2>
          <div className="flex gap-8">
            <div className="flex flex-col whitespace-nowrap gap-[52px] text-xs">
              {stepItems.map(({ hoursLeft }, index) => (
                <p key={index}>{hoursLeft} hrs left</p>
              ))}
            </div>
            <Steps direction="vertical" size="small" current={0}>
              {stepItems.map(({ stepItem }) => (
                <Step {...stepItem} />
              ))}
            </Steps>
          </div>
        </Card>
      )}
    </>
  );
};

export default TodayAppointments;
