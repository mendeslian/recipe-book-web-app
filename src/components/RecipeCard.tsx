import { useRouter } from "next/router";
import { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const router = useRouter();

  return (
    <div
      className="border p-4 rounded cursor-pointer hover:shadow-lg"
      onClick={() => router.push(`/recipes/${recipe.idMeal}`)}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-bold text-lg">{recipe.strMeal}</h3>
    </div>
  );
};

export default RecipeCard;
