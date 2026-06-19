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
  placeholder = "",
}) {
  return (
    <>
      <label htmlFor={elementId} className={labelClassName}>
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
        placeholder={placeholder}
      />
    </>
  );
}

export default TextInputWithLabel;
