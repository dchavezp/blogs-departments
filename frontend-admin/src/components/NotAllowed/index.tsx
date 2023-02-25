import { useRouter } from "next/router";
import styles from "./not-allowed.module.css";
function NotAllowed() {
  const router = useRouter();
  const goBack = () => {
    router.push("/");
  };
  return (
    <div className={styles.container}>
      Debe iniciar sesión primero <a onClick={goBack}>Volver al Login</a>
    </div>
  );
}

export default NotAllowed;
