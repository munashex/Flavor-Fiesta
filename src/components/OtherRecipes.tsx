import {useState, useEffect} from 'react' 
import axios from 'axios'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

interface MealTypes {
    strMeal: string, 
    strMealThumb: string, 
    idMeal: string
}

const OtherRecipes = () => {

const [chickenRecipes, setChickenRecipes] = useState<MealTypes[]>([])  
const [VegetarianRecipes, setVegetarianRecipes] = useState<MealTypes[]>([])



const getChickenRecipes = async() => {
 try{
const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken')
setChickenRecipes(response.data.meals)
 }catch(err) {
    console.log(err)
 }
}

const getVegetarianRecipes = async() => {
    try{
   const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian')
   setVegetarianRecipes(response.data.meals)
    }catch(err) {
       console.log(err)
    }
   }

   useEffect(() => {
   getChickenRecipes() 
   getVegetarianRecipes()
   }, [])

    return (
        <div>
            {/* chicken recipes */}
          <div className="mt-28 grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-7">
            <div className="grid grid-cols-2 gap-3 order-1 md:order-none">
            {chickenRecipes.slice(2, 4).map((recipe) => (
            <div key={recipe.idMeal} className="space-y-2"> 
             <img src={recipe.strMealThumb}  alt={recipe.strMeal}/>  
             <h1>{recipe.strMeal}</h1>
            </div>
            ))} 
            </div>

            <div className="flex flex-col gap-y-4 items-center justify-center">
              <h1 className="bg-black text-white p-2 px-4">CHICKEN RECIPES</h1>
              <h1 className="text-2xl font-bold">All things chicken</h1> 
              <h1 className="text-gray-600 lg:text-lg text-center">Explore top chicken recipes from around the globe to discover a variety of delicious dishes and new recipes to enhance your cooking repertoire. Find more chicken recipes and enjoy a world of flavors!</h1>
               <Link to="/category/Chicken" className="font-bold inline-flex items-center gap-x-2 hover:underline">VIEW ALL RECIPES <span><FaArrowRight size={20}/></span></Link>
            </div>

          </div> 

           {/* vegetarian recipes */}
           <div className="mt-28  grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-7">
            <div className="grid grid-cols-2 gap-3 lg:order-2">
            {VegetarianRecipes.slice(0, 2).map((recipe) => (
            <div key={recipe.idMeal} className="space-y-2"> 
             <img src={recipe.strMealThumb}  alt={recipe.strMeal}/>  
             <h1>{recipe.strMeal}</h1>
            </div>
            ))} 
            </div>

            <div className="flex flex-col gap-y-4 items-center justify-center">
              <h1 className="bg-black text-white p-2 px-4">Vegetarian</h1>
              <h1 className="text-2xl font-bold">Vegetarian recipes</h1> 
              <h1 className="text-gray-600 lg:text-lg text-center">Discover top vegetarian recipes from around the world to explore a range of delicious plant-based dishes and innovative ideas to enrich your culinary skills. Browse more vegetarian recipes and savor a world of flavors!</h1>
               <Link to="/category/Vegetarian" className="font-bold inline-flex items-center gap-x-2 hover:underline">VIEW ALL RECIPES <span><FaArrowRight size={20}/></span></Link>
            </div>

          </div> 


        </div>
    )
} 

export default OtherRecipes