import React, { useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import styles from "./login-form.module.css";
import { useRouter } from "next/router";
import { loginUser } from "@/services/auth.service";
import { Session } from "@/types";
import { useFormik } from "formik";
import { LogInSchema } from "@/validation/login.validation";

function LoginForm() {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const goBlogs = () => {
    router.push("/department");
  };
  const handleLogIn = async (username: string, password: string) => {
    const session: Session = await loginUser(username, password);
    const { isLogged, userProfile } = session;
    if (isLogged) {
      if (userProfile.role === "blogger") {
        localStorage.setItem("isLogged", "TRUE");
        localStorage.setItem("username", userProfile.username);
        localStorage.setItem("role", userProfile.role);
        router.push("/main/blogger");
      } else {
        localStorage.setItem("isLogged", "TRUE");
        localStorage.setItem("username", userProfile.username);
        localStorage.setItem("role", userProfile.role);
        router.push("/main/admin");
      }
    } else {
      setMessage("Verifique si ingreso sus datos correctamente");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogIn(values.username, values.password);
    },
    validationSchema: LogInSchema,
  });
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Front End Admin</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          label="Usuario"
          placeholder="Ingrese su usuario"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username ? (
          <div className={styles.error}>{formik.errors.username}</div>
        ) : null}
        <TextInput
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          type={"password"}
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.username ? (
          <div className={styles.error}>{formik.errors.password}</div>
        ) : null}
        <Button type="submit">Ingresar</Button>
      </form>
      {message.length > 0 ? (
        <div className={styles.error}>{message}</div>
      ) : null}
      <a onClick={goBlogs}>Ver Blogs Publicados</a>
    </div>
  );
}

export default LoginForm;
