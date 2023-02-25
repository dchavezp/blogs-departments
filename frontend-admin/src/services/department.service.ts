import useSWR from "swr";
const API_URL = process.env.API_HOST ?? ""

const getDepartments = () => {
    const filter = {
    }
    const fetcher = async () => {
        const response = await fetch(`${API_URL}/departments?filter=${JSON.stringify(filter)}`, {})
        const data = await response.json()
        return data
    }
    const { data, error } = useSWR(
        `/departments/`,
        fetcher
    );
    return { data, error, isLoading: data === undefined }
}
export { getDepartments }