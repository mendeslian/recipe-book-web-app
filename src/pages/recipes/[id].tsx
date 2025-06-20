import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// services
import { fetchRecipeById, fetchRecipes } from "../../services/api";

// types
import { Recipe } from "../../types";

const RecipeInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const loadRecipe = async () => {
      const recipeData = await fetchRecipeById(id);
      setRecipe(recipeData);

      if (recipeData?.strCategory) {
        const related = await fetchRecipes({
          category: recipeData.strCategory,
        });
        setCategoryRecipes(related);
      }
    };

    loadRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
    const measure = recipe[`strMeasure${i}` as keyof Recipe];
    if (ingredient) ingredients.push({ ingredient, measure });
  }

  return (
    <div className="p-8 flex flex-col md:flex-row gap-4">
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold text-center">{recipe.strMeal}</h1>
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          width={400}
          height={400}
          className="rounded object-cover"
        />
        <div className="text-center mb-4">
          <Link href={`/recipes?area=${recipe.strArea}`}>{recipe.strArea}</Link>
        </div>
        <p className="mb-4">{recipe.strInstructions}</p>

        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul>
          {ingredients.map(({ ingredient, measure }, idx) => (
            <li key={idx}>
              <Link href={`/recipes?ingredient=${ingredient}`}>
                {ingredient}
              </Link>{" "}
              - {measure}
            </li>
          ))}
        </ul>
      </div>

      <aside className="md:w-1/3 border-l pl-4">
        <h2 className="text-xl font-semibold mb-2">
          More in {recipe.strCategory}
        </h2>
        <ul>
          {categoryRecipes.map((r) => (
            <li key={r.idMeal}>
              <Link href={`/recipes/${r.idMeal}`}>{r.strMeal}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default RecipeInfo;
