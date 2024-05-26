import { useGetAllPatientsQuery } from "@/redux/services/hmsApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import roleContext from "@/context/RoleContext/roleContext";
<<<<<<< HEAD
import { sortAscending, sortDescending } from "@/utils/utils";
=======
<<<<<<< HEAD
import { sortAscending, sortByGender, sortDescending } from "@/utils/utils";
=======
import { sortAscending, sortDescending } from "@/utils/utils";
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
import TableLayout from "../TableLayout/TableLayout";
const PatientTable = ({ items, handleClick }) => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const sortingOptions = [
    { value: "newPatients", label: "New Patients", key: 1 },
    { value: "oldPatients", label: "Old Patients", key: 2 },
  ];
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> e9e9aca (Completed Doctor Module)
  const genderOptions = [
    { value: 5, label: "Male", key: 1 },
    { value: 6, label: "Female", key: 2 },
  ];
<<<<<<< HEAD
=======
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
  const {
    data: patientsData,
    error,
    isLoading,
  } = useGetAllPatientsQuery(localStorage.getItem("Doctortoken"));

  const updatePatientData = (patientsData) => {
    // console.log(Object.keys(patientsData[0]));
    const firstItem = patientsData[0];
    const extractedColumns = Object.keys(firstItem).map((key) => ({
      title: key,
      dataIndex: key,
      i: key,
    }));
    const extractedData = patientsData.map((data, i) => {
      let gender = "";
      if (data.Gender === 5) {
        gender = "Male";
      } else if (data.Gender === 6) {
        gender = "Female";
      } else {
        gender = data.Gender;
      }

      let date = "";
      if (data["Visit Date"]) {
        date = new Date(data["Visit Date"]).toLocaleDateString();
      }
      return {
        ...data,
        key: i,
        Gender: gender,
        ["Visit Date"]: date,
      };
    });

    return { extractedColumns, extractedData };
  };
  const handleSort = (val) => {
    let sortedData;
    if (val === "newPatients") {
<<<<<<< HEAD
      sortedData = sortDescending(patientsData, "Visit Date");
    } else {
      sortedData = sortAscending(patientsData, "Visit Date");
=======
<<<<<<< HEAD
      sortedData = sortDescending(patientsData);
    } else {
      sortedData = sortAscending(patientsData);
=======
      sortedData = sortDescending(patientsData, "Visit Date");
    } else {
      sortedData = sortAscending(patientsData, "Visit Date");
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
    }
    const { extractedColumns, extractedData } = updatePatientData(sortedData);
    setPatientData(extractedData);
    setColumnsData(extractedColumns);
  };

  const handleGender = (val) => {
    let sortedData;
    console.log(val);
    if (val === 5) {
<<<<<<< HEAD
      sortedData = sortAscending(patientsData, "Gender");
    } else {
      sortedData = sortDescending(patientsData, "Gender");
=======
<<<<<<< HEAD
      sortedData = sortByGender(val, patientsData);
    } else {
      sortedData = sortByGender(val, patientsData);
=======
      sortedData = sortAscending(patientsData, "Gender");
    } else {
      sortedData = sortDescending(patientsData, "Gender");
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
    }
    const { extractedColumns, extractedData } = updatePatientData(sortedData);
    console.log(extractedData);
    setPatientData(extractedData);
    setColumnsData(extractedColumns);
  };
  const [search, setSearch] = useState("");
  const handleSearch = (val) => {
    setSearch(val);
    const filteredData = patientsData.filter((data) => {
      return data["Full Name"].toLowerCase().includes(val.toLowerCase());
    });
    if (filteredData.length === 0) return;
    const { extractedColumns, extractedData } = updatePatientData(filteredData);
    setPatientData(extractedData);
    setColumnsData(extractedColumns);
  };
  const [filterDate, setFilterDate] = useState([null, null]);

  const updateFilterDate = (dates) => {
    setFilterDate(dates);
    if (!dates || dates[0] === null || dates[1] === null) {
      const { extractedColumns, extractedData } =
        updatePatientData(patientsData);
      setPatientData(extractedData);
      setColumnsData(extractedColumns);
      return;
    }
  };

  const handleFilter = (dates) => {
    setFilterDate(dates);
    const filteredData = patientsData.filter((data) => {
      const date = new Date(data["Visit Date"]);
      return date >= dates[0] && date <= dates[1];
    });
    const { extractedColumns, extractedData } = updatePatientData(filteredData);
    setPatientData(extractedData);
    setColumnsData(extractedColumns);
  };

  const { role } = useContext(roleContext);

  useEffect(() => {
    if (!localStorage.getItem("Doctortoken")) {
      navigate("/");
    }
    if (patientsData?.length > 0) {
      const { extractedColumns, extractedData } =
        updatePatientData(patientsData);

      setColumnsData(extractedColumns);
      setPatientData(extractedData);
    }
  }, [patientsData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableProps = {
    data: patientData,
    error: error,
    isLoading: isLoading,
    handleSort: handleSort,
    handleGender: handleGender,
    handleFilter: handleFilter,
    updateFilterDate: updateFilterDate,
    handleSearch: handleSearch,
    items: items,
    handleClick: handleClick,
    columns: columnsData,
    search: search,
    sortingOptions: sortingOptions,
    filterDate: filterDate,
<<<<<<< HEAD
    genderOptions,
    genderOptions,
=======
<<<<<<< HEAD
=======
    genderOptions,
    genderOptions,
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
  };

  return <TableLayout {...tableProps} />;
};

export default PatientTable;
