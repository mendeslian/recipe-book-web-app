import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
});

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  [key: string]: any;
};

export const fetchRecipes = async (params?: {
  ingredient?: string;
  area?: string;
  category?: string;
}): Promise<Recipe[]> => {
  const response = await api.get("/recipes", { params });
  return response.data.meals || [];
};

// Detalhes de uma receita específica
export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  const response = await api.get(`/recipes/${id}`);
  return response.data.meals ? response.data.meals[0] : null;
};

export default api;
