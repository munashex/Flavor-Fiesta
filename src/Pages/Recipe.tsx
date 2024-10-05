import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface RecipeTypes {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strYoutube: string;
    strCategory: string;
}

interface MealTypes {
    strMeal: string, 
    strMealThumb: string, 
    idMeal: string
}

const SkeletonLoader = () => (
    <div className="max-w-6xl mx-auto p-4 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 gap-8">
                <div className="h-64 md:h-80 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </div>
        <div className="h-48 bg-gray-200 rounded"></div>
    </div>
);

const Recipe = () => {
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState<RecipeTypes | null>(null);
    const [meals, setMeals] = useState<MealTypes[]>([]);
    const { id } = useParams<{ id: string }>();

    const getRecipe = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            setRecipe(response.data.meals[0]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getByCategory = async (name: string | undefined) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`); 
            setMeals(response.data.meals || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getRecipe();
        }
        if (recipe?.strCategory) {
            getByCategory(recipe.strCategory);
        }
        window.scrollTo(0, 0); // Scroll to top when `id` or `recipe` changes
    }, [id, recipe?.strCategory]);

    if (loading) return <SkeletonLoader />;
    if (!recipe) return <div className="text-center mt-8 text-xl">Yo, we couldn't find that recipe!</div>;

    const videoId = recipe.strYoutube?.split('v=')[1];

    return (
        <div>
            {/* top nav */}
            <div className="inline-flex items-center gap-2 text-sm">
                <h1 className="text-gray-700">HOME / RECIPE / <Link className="font-semibold underline" to={`/category/${recipe.strCategory}`}>{recipe.strCategory.toLocaleUpperCase()}</Link> /</h1>
                <h1 className="text-black font-bold">{recipe.strMeal.toLocaleUpperCase()}</h1> 
            </div>

            <div className="grid border my-11 border-slate-300 rounded-lg lg:border-none grid-cols-1 lg:grid-cols-2 gap-8 bg-white overflow-hidden">
                <img 
                    className="w-full h-64 md:h-80 object-cover lg:h-[70%]" 
                    src={recipe.strMealThumb} 
                    alt={recipe.strMeal}
                /> 

                <div className="flex flex-col p-2"> 
                    <h1 className="text-2xl font-bold mb-4 font-unbounded">{recipe.strMeal.toUpperCase()}</h1>
                    <p className="text-gray-700 leading-relaxed">
                       {recipe.strInstructions}
                    </p>
                </div> 
            </div> 

            <div className="flex flex-col my-11 lg:my-0 md:mx-16 lg:mx-44 justify-center gap-3 items-center">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold font-unbounded">Watch How It's Made</h1> 
                <iframe className="h-[500px] w-full" src={`https://youtube.com/embed/${videoId}?controls=1`} />
            </div>

            <div className="lg:my-16 space-y-5">
                <h1 className="text-2xl md:text-3xl font-semibold text-center">{meals?.length === 0 ? '': 'Related Recipes'}</h1>
                <div className="grid grid-cols-2 my-9 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-5">
                    {meals.slice(0, 8).map((meal) => (
                        <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="block space-y-2 border-slate-300 rounded-md hover:shadow-md transition-shadow duration-300"> 
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto"/> 
                            <h1 className="text-sm md:text-base p-2">{meal.strMeal}</h1>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recipe;
