import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import React, { useState } from "react";
import Menu from "../Menu";

import styles from "./menu-user.module.css";
function MenuUser() {
  const [username, setUsername] = useState<string | null>("");
  const [role, setRole] = useState<string | null>("");
  useIsomorphicLayoutEffect(() => {
    const userName: string | null = localStorage.getItem("username");
    const role: string | null = localStorage.getItem("role");
    setUsername(userName);
    setRole(role);
  }, []);
  return (
    <div className={styles.userMenu}>
      <Menu role={username} username={role} />
    </div>
  );
}

export default MenuUser;
