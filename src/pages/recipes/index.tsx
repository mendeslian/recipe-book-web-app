import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChefHat, Search, Loader2, X } from "lucide-react";
import Head from "next/head";

//services
import { fetchRecipes } from "../../services/api";

//components
import RecipeCard from "../../components/RecipeCard";

// types
import { Recipe } from "../../types";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    ingredient: "",
    area: "",
    category: "",
  });

  const router = useRouter();
  const { ingredient, area, category } = router.query;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    if (isMounted) {
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, [isMounted]);

  useEffect(() => {
    if (router.isReady) {
      setFilters({
        ingredient: (ingredient as string) || "",
        area: (area as string) || "",
        category: (category as string) || "",
      });
    }
  }, [router.isReady, ingredient, area, category]);

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

    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, ingredient, area, category]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFilters({
      ingredient: name === "ingredient" ? value : "",
      area: name === "area" ? value : "",
      category: name === "category" ? value : "",
    });
  };

  const handleFilterSubmit = () => {
    const query: any = {};

    if (filters.ingredient) {
      query.ingredient = filters.ingredient;
    } else if (filters.area) {
      query.area = filters.area;
    } else if (filters.category) {
      query.category = filters.category;
    }

    router.push({ pathname: "/recipes", query });
  };

  const handleClearFilters = () => {
    setFilters({
      ingredient: "",
      area: "",
      category: "",
    });
    router.push({ pathname: "/recipes" });
  };

  const getFilterInfo = () => {
    if (ingredient) return `Ingredient: ${ingredient}`;
    if (area) return `Country: ${area}`;
    if (category) return `Category: ${category}`;
    return "All recipes";
  };

  if (!isMounted) {
    return (
      <div className="to-neutral-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHat className="text-orange-600" size={32} />
              <h1 className="text-4xl font-bold text-neutral-800">
                Recipes List
              </h1>
            </div>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
            <p className="text-neutral-600 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const getDynamicTitle = () => {
    if (ingredient) return `${ingredient} Recipes`;
    if (area) return `${area} Recipes`;
    if (category) return `${category} Recipes`;
    return "Recipes List";
  };

  return (
    <>
      <Head>
        <title>{getDynamicTitle()}</title>
        <meta
          name="description"
          content="Search and discover delicious recipes"
        />
      </Head>
      <div className="to-neutral-100">
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

          <div className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center sm:flex-row gap-4 sm:items-end">
              <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-neutral-700 mb-2">
                    Ingredient
                  </label>
                  <input
                    type="text"
                    name="ingredient"
                    placeholder="Chicken, Beef"
                    className="border border-neutral-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    value={filters.ingredient}
                    onChange={handleInputChange}
                    disabled={filters.area !== "" || filters.category !== ""}
                  />
                  {(filters.area !== "" || filters.category !== "") && (
                    <p className="text-xs text-neutral-400 mt-1">
                      Clear other filters to use this field
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-neutral-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="area"
                    placeholder="Italian, Mexican"
                    className="border border-neutral-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    value={filters.area}
                    onChange={handleInputChange}
                    disabled={
                      filters.ingredient !== "" || filters.category !== ""
                    }
                  />
                  {(filters.ingredient !== "" || filters.category !== "") && (
                    <p className="text-xs text-neutral-400 mt-1">
                      Clear other filters to use this field
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-neutral-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Side, Seafood"
                    className="border border-neutral-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    value={filters.category}
                    onChange={handleInputChange}
                    disabled={filters.ingredient !== "" || filters.area !== ""}
                  />
                  {(filters.ingredient !== "" || filters.area !== "") && (
                    <p className="text-xs text-neutral-400 mt-1">
                      Clear other filters to use this field
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleFilterSubmit}
                  className={`flex items-center justify-center gap-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform cursor-pointer ${
                    isMobile ? "px-4 py-2.5" : "w-11 h-11"
                  }`}
                >
                  {isMobile && "Search"}
                  <Search size={18} />
                </button>
                <button
                  onClick={handleClearFilters}
                  className={`flex items-center justify-center gap-2 bg-neutral-500 text-white rounded-lg hover:bg-neutral-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg cursor-pointer ${
                    isMobile ? "px-4 py-2.5" : "w-11 h-11"
                  }`}
                >
                  {isMobile && "Clear"}
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2
                className="animate-spin text-orange-600 mb-4"
                size={48}
              />
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
    </>
  );
};

export default RecipeList;
