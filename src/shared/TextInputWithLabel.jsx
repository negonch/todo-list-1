function TextInputWithLabel({
  elementId,
  labelText,
  type = "text",
  onChange,
  ref,
  value,
  disabled = false,
  required = false,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type={type}
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </>
  );
}

export default TextInputWithLabel;
