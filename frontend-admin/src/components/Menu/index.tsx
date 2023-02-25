import Avatar from "../Avatar";
import { useState } from "react";
import styles from "./menu.module.css";
import { useRouter } from "next/router";
import useSsr from "@/hooks/useSsr";
interface MenuProps {
  username: string | null;
  role: string | null;
}
function Menu({ username, role }: MenuProps) {
  const router = useRouter();
  const [active, setActive] = useState<boolean>(false);
  const singOut = () => {
    router.push("/");
    localStorage.clear();
  };
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <strong>{role}</strong>
        <div>{username}</div>
      </div>
      <Avatar
        username="Admin"
        onClick={() => {
          setActive((value) => !value);
        }}
      />
      {active ? (
        <div className={styles.options}>
          <div onClick={singOut}>Cerrar Sesión</div>
        </div>
      ) : null}
    </div>
  );
}

export default Menu;
