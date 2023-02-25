import useSWR from "swr";
const API_URL = process.env.API_HOST ?? ""

const getRoles = () => {
    const filter = {
    }
    const fetcher = async () => {
        const response = await fetch(`${API_URL}/roles?filter=${JSON.stringify(filter)}`, {})
        const data = await response.json()
        return data
    }
    const { data, error } = useSWR(
        `/roles/`,
        fetcher
    );
    return { data, error, isLoading: data === undefined }
}
export { getRoles }