import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChefHat, Search, Loader2 } from "lucide-react";

//services
import { fetchRecipes } from "../../services/api";

//components
import RecipeCard from "../../components/RecipeCard";

// types
import { Recipe } from "../../types";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { ingredient, area, category } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipes({
          ingredient: ingredient as string,
          area: area as string,
          category: category as string,
        });
        setRecipes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ingredient, area, category]);

  const getFilterInfo = () => {
    if (ingredient) return `Ingredient: ${ingredient}`;
    if (area) return `Area: ${area}`;
    if (category) return `Category: ${category}`;
    return "All recipes";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="text-orange-600" size={32} />
            <h1 className="text-4xl font-bold text-neutral-800">
              Recipes List
            </h1>
          </div>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
          <p className="text-neutral-600 text-lg">{getFilterInfo()}</p>
          {recipes.length > 0 && !loading && (
            <p className="text-sm text-neutral-500 mt-2">
              {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
            <p className="text-neutral-600 text-lg">Loading recipes...</p>
          </div>
        )}

        {!loading && recipes.length === 0 && (
          <div className="text-center py-20">
            <Search className="text-neutral-400 mx-auto mb-4" size={64} />
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No recipes found
            </h3>
            <p className="text-neutral-500">
              Try searching with different filters or ingredients.
            </p>
          </div>
        )}

        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
