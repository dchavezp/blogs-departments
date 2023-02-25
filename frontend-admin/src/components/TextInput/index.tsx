import React from "react";
import styles from "./text-input.module.css";
interface TextInputProps extends React.ComponentProps<"input"> {
  label?: string;
}
function TextInput({ label, ...props }: TextInputProps) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input className={styles.input} {...props}></input>
    </div>
  );
}

export default TextInput;
