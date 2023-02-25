import useSWR from "swr";
const API_URL = process.env.API_HOST ?? ""

const getUsers = (page: number, query: string) => {
    const filter = {
        where: {
            username: { like: `${query}` }
        },
        include: [
            {
                relation: "role",
            },
            { relation: "department" }
        ]
    }
    const fetcher = async () => {
        const response = await fetch(`${API_URL}/users?filter=${JSON.stringify(filter)}`, {})
        const data = await response.json()
        return data
    }
    const { data, error } = useSWR(
        `/users/${query}/page/${page}`,
        fetcher
    );
    return { data, error, isLoading: data === undefined }
}
const createUser = async (username: string, password: string, roleId: string, departmentId: string) => {
    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            roleId: roleId,
            departmentId: departmentId
        })
    }
    const response = await fetch(`${API_URL}/users`, config)
    const data = await response.json()
    return data;
}
const updateUser = async (idUser: string, username: string, password: string, roleId: string, departmentId: string) => {
    const config = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            roleId: roleId,
            departmentId: departmentId
        })
    }
    const response = await fetch(`${API_URL}/users/${idUser}`, config)
    const data = await response.json()
    return data;
}
export { getUsers, createUser, updateUser }