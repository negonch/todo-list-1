import { useState } from "react";
import styles from "./CustomDropdown.module.css";

function CustomDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    options.find((option) => option.value === value) || options[0];

  const handleSelect = (newValue) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>{label}</label>

      <div
        className={styles.dropdown}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsOpen(false);
          }
        }}
      >
        <button
          type="button"
          className={styles.dropdownButton}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{selectedOption.label}</span>
          <span className={styles.arrow}>▾</span>
        </button>

        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={`${styles.dropdownOption} ${
                    value === option.value ? styles.selectedOption : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CustomDropdown;
