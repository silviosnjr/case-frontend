import axios from "axios";

const API_URL = "http://localhost:3000"; // altere se o backend estiver rodando em outra porta

const api = axios.create({
  baseURL: API_URL,
});

// 👇 Exporta a função login corretamente
export const login = async (email, senha) => {
  const response = await api.post("/login", { email, senha });
  return response.data;
};

export default api;
