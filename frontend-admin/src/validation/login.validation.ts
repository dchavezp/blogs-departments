import * as Yup from 'yup';
export const LogInSchema = Yup.object().shape({
    username: Yup.string().required("Necesita ingresar su usuario"),
    password: Yup.string().required("Necesita ingresar su contraseña")
})