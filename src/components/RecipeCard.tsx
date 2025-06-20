import { useRouter } from "next/router";
import Image from "next/image";
import { ChefHat } from "lucide-react";

// types
import { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-200 max-w-sm mx-auto">
      <div className="relative h-48 bg-neutral-100">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-neutral-800 line-clamp-2 mb-2">
            {recipe.strMeal}
          </h3>
          <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
        </div>

        <button
          onClick={() => router.push(`/recipes/${recipe.idMeal}`)}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <ChefHat size={18} />
          View recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
