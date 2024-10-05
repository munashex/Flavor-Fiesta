import { useState, useEffect } from "react";
import axios from 'axios'; 
import { Link } from "react-router-dom";

type TabsTypes = 'Seafood' | 'Vegetarian' | 'Dessert' | 'Pasta';
interface MealTypes {
    strMeal: string, 
    strMealThumb: string, 
    idMeal: string
}

const LatestRecipes = () => {
    const [tabs, setTabs] = useState<TabsTypes>('Seafood'); 
    const [meals, setMeals] = useState<MealTypes[]>([]);
    const [loading, setLoading] = useState(true);

    const getByCategory = async (name: TabsTypes) => {
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
        getByCategory(tabs);
    }, [tabs]);

    const renderMeals = () => (
        <div className="grid grid-cols-2 my-9 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-5">
            {loading ? (
                Array(8).fill(null).map((_, index) => (
                    <div key={index} className="space-y-2"> 
                        <span className="w-[200] md:w-[270px] h-[270px] bg-gray-300 block"></span> 
                        <h1 className="w-[200px] h-[30px] bg-gray-300"></h1>
                    </div>
                ))
            ) : (
                meals.slice(0, 8).map((meal) => (
                    <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="block space-y-2 border-slate-300 rounded-md hover:shadow-md transition-shadow duration-300"> 
                        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto"/> 
                        <h1 className="text-sm md:text-base p-2">{meal.strMeal}</h1>
                    </Link>
                ))
            )}
        </div>
    );

    return (
        <div className="my-16 lg:my-0"> 
            <div className="space-y-4">
                <h1 className="text-center font-bold text-lg lg:text-xl">Latest Recipes</h1>
                <h1 className="font-extrabold text-2xl font-unbounded  md:text-3xl text-center">New from our kitchen</h1>
            </div>

            <div className="mt-6 md:max-w-md lg:max-w-lg mx-auto">
                <div className="md:text-lg border border-slate-300 flex flex-row justify-between">
                    {(['Seafood', 'Vegetarian', 'Dessert', 'Pasta'] as TabsTypes[]).map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setTabs(tab)} 
                            className={`px-4 py-2 ${tabs === tab ? 'bg-black text-white' : 'text-gray-700'}`}
                        >
                            {tab}
                        </button> 
                    ))}
                </div> 
            </div> 
            {renderMeals()}
        </div>
    );
};

export default LatestRecipes;
