import axios from "axios";
import { API_ROOT } from "~/utilities/constants";


// Why don't we use try/catch here? Because we want to handle errors in the component that calls this function instead
export const fetchBoardDetailAPI = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)

    // Axios returns data in a property called data
    return response.data
}