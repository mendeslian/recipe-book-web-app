import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecipeCard from "../../components/RecipeCard";
import { fetchRecipes } from "../../services/api";
import { Recipe } from "../../types";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();
  const { ingredient, area, category } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipes({
          ingredient: ingredient as string,
          area: area as string,
          category: category as string,
        });
        setRecipes(data);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      }
    };

    fetchData();
  }, [ingredient, area, category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
