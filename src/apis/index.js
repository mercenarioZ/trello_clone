import axios from "axios";
import { API_ROOT } from "~/utilities/constants";

export const fetchBoardDetailAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);

  // Axios returns data in a property called data
  return response.data;
};

// Update board after drag and drop
export const updateBoardDetailAPI = async (boardId, updatedData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updatedData
  );

  return response.data;
};

export const createNewColumnAPI = async (columnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, columnData);

  return response.data;
};

export const createNewCardAPI = async (cardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, cardData);
  return response.data;
};
