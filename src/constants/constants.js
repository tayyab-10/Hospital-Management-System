import MainAdminDashboard from "@/components/Pages/MainAdmin/MainAdminDashboard";
import {
  validateEmail,
  validatePassword,
  validatecPassword,
} from "@/utils/utils";
import Doctor from "@/components/Pages/Doctor/Doctor";
import {
  FaUsers,
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaFileInvoice,
  FaCapsules,
  FaSignOutAlt,
  FaCog,
  FaCogs,
} from "react-icons/fa";

import {
  ClockCircleOutlined,
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  FileOutlined,
  MedicineBoxOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const iconComponents = {
  departments: FaUsers,
  patients: TeamOutlined,
  doctors: FaUserMd,
  appointments: CalendarOutlined,
  invoices: FileOutlined,
  medicines: MedicineBoxOutlined,
  logout: LogoutOutlined,
  dashboard: HomeOutlined,
  treatment: MedicineBoxOutlined,
  settings: SettingOutlined,
};

export const adminOptions = [
  { value: 2, label: "Departments", Icon: iconComponents.departments },
  { value: 3, label: "Patients", Icon: iconComponents.patients },
  { value: 4, label: "Doctors", Icon: iconComponents.doctors },
  { value: 5, label: "Appointments", Icon: iconComponents.appointments },
  { value: 6, label: "Invoices", Icon: iconComponents.invoices },
  { value: 7, label: "Medicines", Icon: iconComponents.medicines },
  { value: 8, label: "Logout", Icon: iconComponents.logout },
];

export const users = [
  { value: 1, name: "Main Admin" },
  { value: 2, name: "Hospital Admin" },
  { value: 3, name: "Doctor" },
  { value: 4, name: "Patient" },
];

export const doctorInputs = [
  {
    value: 1,
    label: "Qualification",
    name: "qualification",
    type: "select",
    validationfn: "",
  },
  {
    value: 2,
    label: "Specialization",
    name: "specialization",
    type: "select",
    validationfn: "",
  },
  {
    value: 3,
    label: "Experience",
    name: "experience",
    type: "number",
    validationfn: "",
  },
  {
    value: 4,
    label: "Checkupstatus",
    name: "checkupstatus",
    type: "number",
    validationfn: "",
  },
  {
    value: 5,
    label: "Consulationfee",
    name: "consulationfee",
    type: "number",
    validationfn: "",
  },
];

export const qualificationSpecializations = [
  {
    qualification: "MBBS",
    specializations: ["General Medicine", "General Surgery", "Pediatrics"],
  },
  {
    qualification: "MD",
    specializations: ["Cardiology", "Oncology", "Neurology"],
  },
  {
    qualification: "DO",
    specializations: [
      "Family Medicine",
      "Osteopathic Manipulative Medicine",
      "Internal Medicine",
    ],
  },
  {
    qualification: "BDS",
    specializations: [
      "General Dentistry",
      "Orthodontics",
      "Pediatric Dentistry",
      "Oral and Maxillofacial Radiology",
      "Oral Pathology",
      "Public Health Dentistry",
    ],
  },
  // More qualifications and their corresponding specializations will be added if needed
];

export const stepperOptions = [
  "User Information",
  "Personal Information",
  "Field Information",
];

export const personalInfoInputs = [
  {
    value: 1,
    label: "Firstname",
    name: "firstname",
    type: "text",
    validationfn: "",
  },
  {
    value: 2,
    label: "Lastname",
    name: "lastname",
    type: "text",
    validationfn: "",
  },

  {
    value: 3,
    label: "Email",
    name: "email",
    type: "email",
    validationfn: validateEmail,
  },
  {
    value: 4,
    label: "Gender",
    name: "gender",
    type: "radio",
    validationfn: "",
  },
  {
    value: 5,
    label: "DateofBirth",
    name: "dateofBirth",
    type: "date",
    validationfn: "",
  },
];

export const userInfoInputs = [
  {
    value: 1,
    label: "Username",
    name: "username",
    type: "text",
    validationfn: "",
  },
  {
    value: 2,
    label: "Password",
    name: "password",
    type: "password",
    validationfn: validatePassword,
  },
  {
    value: 3,
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    validationfn: validatecPassword,
  },
];
export const petientInfoInputs = [
  {
    value: 1,
    label: "Description",
    name: "description",
    type: "textarea",
    validationfn: "",
  },
  {
    value: 2,
    label: "Alive Status",
    name: "aliveStatus",
    type: "radio",
    validationfn: "",
  },
  {
    value: 3,
    label: "Medical History",
    name: "medicalHistory",
    type: "textarea",
    validationfn: "",
  },
];

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  // Add more columns as needed
];

export const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  // Add more data rows as needed
];

export const doctorOptions = [
  { value: 1, label: "Dashboard", Icon: iconComponents.dashboard },
  { value: 2, label: "Patients", Icon: iconComponents.patients },
  { value: 3, label: "Treatment", Icon: iconComponents.treatment },
  { value: 4, label: "Settings", Icon: iconComponents.settings },
  { value: 5, label: "Logout", Icon: iconComponents.logout },
];

export const patientCards = [
  { value: 1, label: "Today Patients", Icon: ClockCircleOutlined },
  { value: 2, label: "Monthly Patients", Icon: CalendarOutlined },
  { value: 3, label: "Yearly Patients", Icon: FileOutlined },
];

export const userComponents = {
  // mainadmin: MainAdmin,
  // hospitaladmin: HospitalAdminDashboard,
  doctor: Doctor,
  // patient: PatientDashboard,
};
// Function to get specializations based on qualification

// ? found.specializations : [];
// Example usage
// console.log(getSpecializations("MBBS")); // Output: ["General Medicine", "General Surgery", "Pediatrics"]
// console.log(getSpecializations("MD")); // Output: ["Cardiology", "Oncology", "Neurology"]
// console.log(getSpecializations("DO")); // Output: ["Family Medicine", "Osteopathic Manipulative Medicine", "Internal Medicine"]
// console.log(getSpecializations("BDS")); // Output: ["General Dentistry", "Orthodontics", "Pediatric Dentistry", "Oral and Maxillofacial Radiology", "Oral Pathology", "Public Health Dentistry"]
// console.log(getSpecializations("PhD"));
