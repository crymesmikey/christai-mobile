import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.backendUrl;

if (!API_BASE_URL) {
  throw new Error('Backend URL is not defined in app.json. Please add it to the `extra` field.');
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

interface ChatResponse {
  reply: string;
}

export const getChatbotResponse = async (
  message: string,
  token: string
): Promise<ChatResponse> => {
  try {
    const response = await apiClient.post(
      '/chat',
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to communicate with the server.');
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
}; 