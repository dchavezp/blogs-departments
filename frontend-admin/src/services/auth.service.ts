const API_URL = process.env.API_HOST ?? ""

export const loginUser = async (username: string, password: string) => {
    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }
    const response = await fetch(`${API_URL}/users/login`, config)
    const data = await response.json()
    return data;
}