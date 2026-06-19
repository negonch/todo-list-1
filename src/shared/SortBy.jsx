import styles from "./SortBy.module.css";
import CustomDropdown from "./CustomDropdown.jsx";

export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div className={styles.sortControls}>
      <CustomDropdown
        label="Sort by:"
        value={sortBy}
        onChange={onSortByChange}
        options={[
          { value: "createdAt", label: "Creation Date" },
          { value: "title", label: "Title" },
        ]}
      />

      <CustomDropdown
        label="Order:"
        value={sortDirection}
        onChange={onSortDirectionChange}
        options={[
          { value: "asc", label: "Ascending" },
          { value: "desc", label: "Descending" },
        ]}
      />
    </div>
  );
}
