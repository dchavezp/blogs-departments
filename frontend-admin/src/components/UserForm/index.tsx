import { getDepartments } from "@/services/department.service";
import { getRoles } from "@/services/role.service";
import React, { useState } from "react";
import Button from "../Button";
import Select from "../Select";
import TextInput from "../TextInput";
import styles from "./user-form.module.css";
import { useFormik } from "formik";
import { UserInfoSchema } from "@/validation/user.validation";
import { UserInfo } from "@/types";
import { createUser, updateUser } from "@/services/user.service";
interface UserFormProps {
  cancel: () => void;
  isEdit?: boolean;
  user: UserInfo;
}
function UserForm({ cancel, isEdit = false, user }: UserFormProps) {
  const { data, isLoading } = getRoles();
  const { data: departments, isLoading: loadingDepartmetns } = getDepartments();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const handleUpdateUser = async (user: UserInfo) => {
    await updateUser(
      user.id,
      user.username,
      user.password,
      user.roleId,
      user.departmentId
    );
  };
  const handleCreateUser = async (user: UserInfo) => {
    await createUser(
      user.username,
      user.password,
      user.roleId,
      user.departmentId
    );
  };
  const formik = useFormik({
    initialValues: {
      username: isEdit ? user.username : "",
      password: isEdit ? user.password : "",
      roleid: isEdit ? user.roleId : "",
      departmentid: isEdit ? user.departmentId : "",
    },
    onSubmit: async (values, { resetForm }) => {
      const userData: Omit<UserInfo, "id"> = {
        username: values.username,
        password: values.password,
        roleId: values.roleid,
        departmentId: values.departmentid,
      };
      if (isEdit) {
        setIsSending(true);
        setMessage("Actualizando Usuario...");
        await handleUpdateUser({ id: user.id, ...userData });
        resetForm();
        setIsSending(false);
        setMessage("");
      } else {
        setIsSending(true);
        setMessage("Registrando Usuario...");
        await handleCreateUser({ id: "", ...userData });
        setMessage("Usuario Registrado!");
        setTimeout(() => {
          setIsSending(false);
          resetForm();
          setMessage("");
        }, 1000);
      }
    },
    validationSchema: UserInfoSchema,
  });
  return (
    <div className={styles.container}>
      {isSending ? (
        <div>{message}</div>
      ) : (
        <>
          <h2>{isEdit ? "Editar Usuario" : "Crear Usuario"}</h2>
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              placeholder="Ingrese nombre de usuario"
              label="Usuario"
              onChange={formik.handleChange}
              value={formik.values.username}
              name="username"
            />
            {formik.errors.username ? (
              <div className={styles.error}>{formik.errors.username}</div>
            ) : null}
            <TextInput
              placeholder="Ingrese nombre de usuario"
              label="Contraseña"
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              name="password"
            />
            {formik.errors.username ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
            {isLoading ? (
              <div>Cargando roles...</div>
            ) : (
              <>
                <Select
                  label="Rol"
                  value={formik.values.roleid}
                  name="roleid"
                  onChange={formik.handleChange}
                >
                  <option value="">Seleccione Valor</option>
                  {data.map((item: any) => {
                    return (
                      <option key={item["id"]} value={item["id"]}>
                        {item["name"]}
                      </option>
                    );
                  })}
                </Select>
                {formik.errors.username ? (
                  <div className={styles.error}>{formik.errors.roleid}</div>
                ) : null}
              </>
            )}
            {loadingDepartmetns ? (
              <div>Cargando departamentos...</div>
            ) : (
              <>
                <Select
                  label="Departamento"
                  value={formik.values.departmentid}
                  onChange={formik.handleChange}
                  name="departmentid"
                >
                  <option value="">Seleccione Valor</option>
                  {departments.map((item: any) => {
                    return (
                      <option key={item["id"]} value={item["id"]}>
                        {item["name"]}
                      </option>
                    );
                  })}
                </Select>
                {formik.errors.username ? (
                  <div className={styles.error}>
                    {formik.errors.departmentid}
                  </div>
                ) : null}
              </>
            )}
            <div className={styles.actions}>
              <Button>
                {isEdit ? "Actualizar Usuario" : "Registrar Usuario"}
              </Button>
              <button onClick={cancel}>Cancelar</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default UserForm;
