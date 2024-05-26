import DataTable from "../DataTable/DataTable";
import { Button, ConfigProvider, Input, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
const TableLayout = ({
  data,
  error,
  isLoading,
  handleSort,
  handleGender,
  handleFilter,
  updateFilterDate,
  handleSearch,
  items,
  handleClick,
  columns,
  search,
  sortingOptions,
  filterDate,
<<<<<<< HEAD
  genderOptions,
=======
<<<<<<< HEAD
=======
  genderOptions,
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            selectorBg: "#f8f9fa",
          },
        },
      }}
    >
      <div className="bg-white py-4 px-4  ro rounded-2xl">
        <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          <Input
            placeholder="Search Patients"
<<<<<<< HEAD
            className="h-14 w-full text-sm text-main border border-border   bg-dry rounded-md px-4"
            value={search}
            style={{ borderColor: "#f8f9fa", borderRadius: "10px" }}
=======
<<<<<<< HEAD
            className="h-14 w-full text-sm text-main rounded-md  border border-border px-4"
            style={{ backgroundColor: "#f8f9fa" }}
            value={search}
=======
            className="h-14 w-full text-sm text-main border border-border   bg-dry rounded-md px-4"
            value={search}
            style={{ borderColor: "#f8f9fa", borderRadius: "10px" }}
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Select
            placeholder="Sort by..."
<<<<<<< HEAD
=======
<<<<<<< HEAD
            className="h-14 w-full text-sm text-main rounded-md"
            options={sortingOptions}
            style={{ backgroundColor: "#f8f9fa" }}
            dropdownStyle={{ backgroundColor: "#f8f9fa" }}
            onChange={(val) => handleSort(val)}
          />
          <Select
            placeholder="Gender"
            className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border"
            options={[
              { value: 5, label: "Male", key: 1 },
              { value: 6, label: "Female", key: 2 },
            ]}
            dropdownStyle={{ backgroundColor: "#f8f9fa" }}
            onChange={(val) => handleGender(val)}
          ></Select>
=======
>>>>>>> e9e9aca (Completed Doctor Module)
            className="h-14 w-full text-sm text-main rounded-md border-none"
            options={sortingOptions}
            style={{
              backgroundColor: "#f8f9fa",
              borderColor: "#f8f9fa",
              borderRadius: "10px",
              border: "2px solid #f8f9fa", // Add border style here
            }}
            dropdownStyle={{ backgroundColor: "#f8f9fa" }}
            onChange={(val) => handleSort(val)}
          />
          {genderOptions && (
            <Select
              placeholder="Gender"
              className="h-14 w-full text-sm text-main rounded-md"
              options={genderOptions}
              dropdownStyle={{ backgroundColor: "#f8f9fa" }}
              onChange={(val) => handleGender(val)}
            ></Select>
          )}
<<<<<<< HEAD
=======
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
          {handleFilter && (
            <>
              <RangePicker
                className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border"
                format="YYYY-MM-DD"
                onChange={(defaultValue) => updateFilterDate(defaultValue)}
                value={filterDate}
<<<<<<< HEAD
=======
<<<<<<< HEAD
              />
              <Button
                icon={<FilterOutlined />}
                className="w-full h-14 flex-rows gap-4 hover:opacity-80 transitions bgSubMain text-white text-sm font-medium px-2  rounded-md"
=======
>>>>>>> e9e9aca (Completed Doctor Module)
                style={{ border: "2px solid #f8f9fa", borderRadius: "10px" }}
              />
              <Button
                icon={<FilterOutlined />}
                className="w-full h-14 flex-rows gap-4 hover:opacity-80 transitions bgSubMain text-white text-sm font-medium px-2"
                style={{ borderRadius: "10px", border: "2px solid #f8f9fa" }}
<<<<<<< HEAD
=======
>>>>>>> 48e3b2482166669ea416abfaa6b0da2da9bb9c58
>>>>>>> e9e9aca (Completed Doctor Module)
                // onClick={() => handleSearch(search)}
                onClick={() => handleFilter(filterDate)}
              >
                Filter
              </Button>
            </>
          )}
        </div>
        <DataTable
          columns={columns}
          data={data}
          items={items}
          handleClick={handleClick}
        />
        {console.log(data)}
      </div>
    </ConfigProvider>
  );
};

export default TableLayout;
