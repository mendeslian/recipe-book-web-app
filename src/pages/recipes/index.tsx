import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecipeCard from "../../components/RecipeCard";
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const { ingredient, area, category } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const params = { ingredient, area, category };
      const res = await axios.get("http://localhost:3000/recipes", { params });
      setRecipes(res.data.meals || []);
    };
    fetchData();
  }, [ingredient, area, category]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((r: any) => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
