import React from "react";
import styles from "./icon-button.module.css";
interface IconButtonProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  active?: boolean;
}
function IconButton({ children, active = true, ...props }: IconButtonProps) {
  return (
    <div className={active ? styles.active : styles.inactive} {...props}>
      {children}
    </div>
  );
}

export default IconButton;
