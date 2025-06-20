import { useRouter } from "next/router";
import Image from "next/image";

// types
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
      <h3 className="mt-2 font-bold text-lg">{recipe.strMeal}</h3>
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={500}
        height={400}
        className="rounded object-cover"
      />
    </div>
  );
};

export default RecipeCard;
