import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import LatestRecipes from '../components/LatestRecipes'; 
import OtherRecipes from '../components/OtherRecipes';

interface RecipeTypes {
    idMeal: string,
    strMeal: string,
    strMealThumb: string, 
    strInstructions: string
}

const SkeletonLoader = () => (
    <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-lg overflow-hidden">
            <div className="w-full h-64 md:h-80 lg:h-[500px] bg-gray-300" />
            <div className="p-6 flex flex-col justify-center">
                <div className="h-8 w-40 bg-gray-300 mb-4" />
                <div className="h-10 w-3/4 bg-gray-300 mb-4" />
                <div className="h-4 w-full bg-gray-300 mb-2" />
                <div className="h-4 w-full bg-gray-300 mb-2" />
                <div className="h-4 w-3/4 bg-gray-300" />
            </div>
        </div>
    </div>
);

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState<RecipeTypes | null>(null);

    const recipeOfTheDay = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
            setRecipe(response.data.meals[0]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        recipeOfTheDay();
        window.scrollTo(0, 0); // Scroll to top when component mounts or updates
    }, []);

    if (loading) {
        return <SkeletonLoader />;
    }

    if (!recipe) {
        return <div className="flex justify-center items-center h-screen">Failed to load recipe</div>;
    }

    return (
        <div className="">
            <Link to={`/recipe/${recipe.idMeal}`} className="grid border border-slate-300 rounded-lg lg:border-none grid-cols-1 lg:grid-cols-2 gap-8 bg-white overflow-hidden">
                <img 
                    className="w-full h-64 md:h-80 object-cover lg:h-[80%]" 
                    src={recipe.strMealThumb} 
                    alt={recipe.strMeal}
                /> 

                <div className="flex flex-col p-2 justify-center items-center"> 
                    <h2 className="bg-black text-white p-1 px-3 mb-4 font-unbounded rounded-full">Recipe Of The Day</h2>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 font-unbounded">{recipe.strMeal}</h1>
                    <p className="text-gray-700 leading-relaxed">
                        {recipe.strInstructions.length > 300 
                            ? `${recipe.strInstructions.substring(0, 300)}...` 
                            : recipe.strInstructions}
                    </p>
                    <h1 className="mt-5 font-bold inline-flex items-center gap-2 font-unbounded">View Recipe <FaArrowRight size={22}/></h1>
                </div> 
            </Link> 

            <LatestRecipes/>
            <OtherRecipes/>
        </div>
    );
};

export default Home;
