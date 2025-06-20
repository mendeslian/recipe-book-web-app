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
    <div className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden transition-shadow duration-200 hover:shadow-lg w-full h-full flex flex-col">
      <div className="relative w-full aspect-[4/3] bg-neutral-100 flex-shrink-0">
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-800 mb leading-tight h-12 overflow-hidden">
            {recipe.strMeal}
          </h3>
          <div className="w-8 h-1 bg-orange-500 rounded-full mb-4"></div>
        </div>

        <button
          onClick={() => router.push(`/recipes/${recipe.idMeal}`)}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-auto"
        >
          View recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
