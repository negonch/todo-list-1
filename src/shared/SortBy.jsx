import styles from "./SortBy.module.css";

export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div className={styles.sortControls}>
      <div className={styles.fieldGroup}>
        <label htmlFor="sortBy" className={styles.label}>
          Sort by:
        </label>
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
          className={styles.select}
        >
          <option value="createdAt">Creation Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="sortDirection" className={styles.label}>
          Order:
        </label>
        <select
          name="sortDirection"
          id="sortDirection"
          value={sortDirection}
          onChange={(event) => onSortDirectionChange(event.target.value)}
          className={styles.select}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
