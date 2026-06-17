import styles from "./TextInputWithLabel.module.css";

function TextInputWithLabel({
  elementId,
  labelText,
  type = "text",
  onChange,
  value,
  disabled = false,
  required = false,
  maxLength,
  labelClassName = "",
}) {
  return (
    <>
      <label htmlFor={elementId} className={styles.labelClassName}>
        {labelText}
      </label>
      <input
        type={type}
        id={elementId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
      />
    </>
  );
}

export default TextInputWithLabel;
