import React from "react";
import styles from "./select.module.css";
interface SelectProps extends React.ComponentProps<"select"> {
  children?: React.ReactNode;
  label?: string;
}
function Select({ children, label, ...props }: SelectProps) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select className={styles.select} {...props}>
        {children}
      </select>
    </div>
  );
}

export default Select;
