import { qualificationSpecializations } from "@/constants/constants";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 3;
};
export const validatecPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const getSpecializations = (qualification) => {
  const found = qualificationSpecializations.find(
    (qual) => qual.qualification === qualification
  );
  return found;
};

export const formatTimeToAmPm = (dateString) => {
  const date = new Date(dateString);
  const localHours = date.getUTCHours();
  const localMinutes = date.getUTCMinutes();
  const hours = localHours % 12 || 12; // Convert hours to 12-hour format
  const ampm = localHours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours}:${
    localMinutes < 10 ? "0" : ""
  }${localMinutes} ${ampm}`;
  return formattedTime;
};

export const getDateDiff = (dateString) => {
  const date = new Date(dateString);
  const todayDate = new Date();
  const todayHours = todayDate.getHours();
  const localHours = date.getUTCHours();
  return localHours - todayHours;
};

export const isEqualToToday = (dateString) => {
  const date = new Date(dateString).getUTCDay();
  const todayDate = new Date().getDay();
  return date === todayDate;
};

<<<<<<< HEAD
export const sortAscending = (data, sortingKey) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a[sortingKey]) - new Date(b[sortingKey])
=======
<<<<<<< HEAD
export const sortAscending = (data) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a["Visit Date"]) - new Date(b["Visit Date"])
=======
export const sortAscending = (data, sortingKey) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a[sortingKey]) - new Date(b[sortingKey])
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
  );
  return sortedData;
};

<<<<<<< HEAD
export const sortDescending = (data, sortingKey) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(b[sortingKey]) - new Date(a[sortingKey])
=======
<<<<<<< HEAD
export const sortDescending = (data) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(b["Visit Date"]) - new Date(a["Visit Date"])
=======
export const sortDescending = (data, sortingKey) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(b[sortingKey]) - new Date(a[sortingKey])
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
  );
  return sortedData;
};

<<<<<<< HEAD
=======
<<<<<<< HEAD
export const sortByGender = (val, data) => {
  let sortedData;
  if (val == 5) {
    sortedData = [...data].sort((a, b) => a.Gender - b.Gender);
  } else {
    sortedData = [...data].sort((a, b) => b.Gender - a.Gender);
  }
  return sortedData;
};
=======
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
export const getComponents = (role) => {
  switch (role) {
    case 1:
      return "MainAdminInfo";
    case 2:
      return "HospitalAdminInfo";
    case 3:
      return "DoctorInfo";
    case 4:
      return "PatientInfo";
  }
};

// more validation functions will be added if needed
