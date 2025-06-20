import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  ChefHat,
  MapPin,
  Tag,
  Loader2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

// services
import { fetchRecipeById, fetchRecipes } from "../../services/api";

// types
import { Recipe } from "../../types";

const RecipeInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const loadRecipe = async () => {
      try {
        setLoading(true);
        const recipeData = await fetchRecipeById(id);
        setRecipe(recipeData);

        if (recipeData?.strCategory) {
          const related = await fetchRecipes({
            category: recipeData.strCategory,
          });
          setCategoryRecipes(related.slice(0, 6));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  const getPageTitle = () => {
    if (!recipe) return "Recipe Details";
    return `${recipe.strMeal} - ${recipe.strArea} Recipe`;
  };

  const getMetaDescription = () => {
    if (!recipe) return "Discover amazing recipes from around the world";
    return `Learn how to make ${recipe.strMeal}, a delicious ${recipe.strArea} ${recipe.strCategory} recipe. Complete ingredients list and step-by-step instructions.`;
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Recipe</title>
          <meta name="description" content="Loading recipe details..." />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
          <div className="text-center">
            <Loader2
              className="animate-spin text-orange-600 mx-auto mb-4"
              size={48}
            />
            <p className="text-neutral-600 text-lg">Loading recipe...</p>
          </div>
        </div>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Head>
          <title>Recipe Not Found</title>
          <meta
            name="description"
            content="The requested recipe could not be found"
          />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
          <div className="text-center">
            <ChefHat className="text-neutral-400 mx-auto mb-4" size={64} />
            <p className="text-neutral-600 text-lg">Recipe not found</p>
          </div>
        </div>
      </>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
    const measure = recipe[`strMeasure${i}` as keyof Recipe];
    if (ingredient && ingredient) {
      ingredients.push({ ingredient: ingredient, measure: measure || "" });
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta property="og:title" content={recipe.strMeal} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:image" content={recipe.strMealThumb} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={recipe.strMeal} />
        <meta name="twitter:description" content={getMetaDescription()} />
        <meta name="twitter:image" content={recipe.strMealThumb} />
        <meta
          name="keywords"
          content={`${recipe.strMeal}, ${recipe.strArea}, ${recipe.strCategory}, recipe, cooking, ingredients`}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-600 hover:text-orange-600 mb-6 transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h1 className="text-3xl font-bold text-neutral-800 mb-4">
                  {recipe.strMeal}
                </h1>
                <div className="w-16 h-1 bg-orange-500 rounded-full mb-4"></div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <MapPin size={16} />
                    <Link
                      href={`/recipes?area=${recipe.strArea}`}
                      className="hover:text-orange-600 transition-colors duration-200"
                    >
                      {recipe.strArea}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Tag size={16} />
                    <Link
                      href={`/recipes?category=${recipe.strCategory}`}
                      className="hover:text-orange-600 transition-colors duration-200"
                    >
                      {recipe.strCategory}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-2xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                  <ChefHat size={24} />
                  Ingredients
                </h2>
                <div className="w-12 h-1 bg-orange-500 rounded-full mb-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ingredients.map(({ ingredient, measure }, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <Link
                          href={`/recipes?ingredient=${ingredient}`}
                          className="font-medium text-neutral-800 hover:text-orange-600 transition-colors duration-200"
                        >
                          {ingredient}
                        </Link>
                        {measure && (
                          <span className="text-neutral-600 ml-2">
                            - {measure}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
                  Preparation Instructions
                </h2>
                <div className="w-12 h-1 bg-orange-500 rounded-full mb-6"></div>

                <div className="prose prose-neutral max-w-none">
                  <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                    {recipe.strInstructions}
                  </p>
                </div>
              </div>

              {(recipe.strYoutube || recipe.strSource) && (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                  <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
                    External Links
                  </h2>
                  <div className="w-12 h-1 bg-orange-500 rounded-full mb-6"></div>

                  <div className="flex flex-wrap gap-3">
                    {recipe.strYoutube && (
                      <a
                        href={recipe.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                        YouTube Video
                      </a>
                    )}
                    {recipe.strSource && (
                      <a
                        href={recipe.strSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                        Original Source
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  More recipes from {recipe.strCategory}
                </h2>
                <div className="w-12 h-1 bg-orange-500 rounded-full mb-6"></div>

                <div className="space-y-3">
                  {categoryRecipes
                    .filter((r) => r.idMeal !== recipe.idMeal)
                    .slice(0, 5)
                    .map((r) => (
                      <Link
                        key={r.idMeal}
                        href={`/recipes/${r.idMeal}`}
                        className="block p-3 bg-neutral-50 rounded-lg hover:bg-orange-50 transition-colors duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={r.strMealThumb}
                              alt={r.strMeal}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-neutral-800 group-hover:text-orange-600 transition-colors duration-200 truncate">
                              {r.strMeal}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>

                {categoryRecipes.length > 6 && (
                  <Link
                    href={`/recipes?category=${recipe.strCategory}`}
                    className="block text-center mt-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
                  >
                    View all recipes from {recipe.strCategory}
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;
