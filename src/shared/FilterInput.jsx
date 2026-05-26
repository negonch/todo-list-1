export default function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div>
      <label htmlFor="filterInput">
        <input
          id="filterInput"
          type="text"
          value={filterTerm}
          onChange={(event) => onFilterChange(e.target.value)}
          placeholder="Search by title..."
        />
      </label>
    </div>
  );
}
