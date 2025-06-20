import axios from "axios";
import { Recipe, FetchRecipesResponse } from "../types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
});

export const fetchRecipes = async (params?: {
  ingredient?: string;
  area?: string;
  category?: string;
}): Promise<Recipe[]> => {
  try {
    const response = await api.get<FetchRecipesResponse>("/recipes", {
      params,
    });
    return response.data.meals ?? [];
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    return [];
  }
};

export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    const response = await api.get<{ meals: Recipe[] | null }>(
      `/recipes/${id}`
    );
    return response.data.meals?.[0] ?? null;
  } catch (error) {
    console.error("Erro ao buscar receita por ID:", error);
    return null;
  }
};

export default api;
