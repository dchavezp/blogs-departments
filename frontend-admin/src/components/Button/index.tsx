import React from "react";
import styles from "./button.module.css";
interface ButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
}
function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

export default Button;
