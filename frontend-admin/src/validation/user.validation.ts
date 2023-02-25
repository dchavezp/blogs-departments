import * as Yup from 'yup';
export const UserInfoSchema = Yup.object().shape({
    username: Yup.string().required("Necesita ingresar su usuario"),
    password: Yup.string().required("Necesita ingresar su contraseña"),
    roleid: Yup.string().required("Necesita seleccionar el role"),
    departmentid: Yup.string().required("Necesita seleccionar el departamento"),
})