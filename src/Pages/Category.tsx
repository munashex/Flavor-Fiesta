import { useParams, Link } from "react-router-dom" 
import axios from 'axios' 
import {useState, useEffect} from 'react'

interface MealTypes {
  strMeal: string, 
  strMealThumb: string, 
  idMeal: string
}

function Category() { 
  const {id} = useParams<{id: string}>()
  const [meals, setMeals] = useState<MealTypes[]>([]);
  const [loading, setLoading] = useState(true);    

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
 if(id) getByCategory(id)
  window.scrollTo(0, 0);
}, [id])



  return (
    <div>
      {/* top nav */}
      <div className="inline-flex items-center gap-2 text-sm">
        <h1 className="text-gray-700">HOME / CATEGORY / </h1>
        <h1 className="text-black font-bold underline">{id?.toLocaleUpperCase()}</h1> 
      </div> 
       
       
      <div className="grid grid-cols-2 my-9 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-5">
            {loading ? (
                Array(8).fill(null).map((_, index) => (
                    <div key={index} className="space-y-2"> 
                        <span className="w-[200] md:w-[270px] h-[270px] bg-gray-300 block"></span> 
                        <h1 className="w-[200px] h-[30px] bg-gray-300"></h1>
                    </div>
                ))
            ) : (
                meals.map((meal) => (
                    <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="block space-y-2 border-slate-300 rounded-md hover:shadow-md transition-shadow duration-300"> 
                        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto"/> 
                        <h1 className="text-sm md:text-base p-2">{meal.strMeal}</h1>
                    </Link>
                ))
            )}
        </div>
    </div>
  )
}

export default Category