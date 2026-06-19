import { useSearchParams } from "react-router";
import CustomDropdown from "./CustomDropdown.jsx";

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";

  const options = [
    { value: "all", label: "All Todos" },
    { value: "active", label: "Active Todos" },
    { value: "completed", label: "Completed Todos" },
  ];

  const handleStatusChange = (status) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (status === "all") {
      newSearchParams.delete("status");
    } else {
      newSearchParams.set("status", status);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <CustomDropdown
      label="Show:"
      value={currentStatus}
      onChange={handleStatusChange}
      options={options}
    />
  );
}

export default StatusFilter;
