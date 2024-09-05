import { useState, useEffect } from 'react'
import axios from 'axios'

interface RecipeTypes {
    idMeal: string,
    strMeal: string,
    strMealThumb: string, 
    strInstructions: string
}

const SkeletonLoader = () => (
    <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-full h-64 bg-gray-300 lg:h-full" />
            <div className="p-6 flex flex-col justify-center">
                <div className="h-8 w-40 bg-gray-300 mb-4" />
                <div className="h-10 w-3/4 bg-gray-300 mb-4" />
                <div className="h-4 w-full bg-gray-300 mb-2" />
                <div className="h-4 w-full bg-gray-300 mb-2" />
                <div className="h-4 w-3/4 bg-gray-300" />
            </div>
        </div>
    </div>
)

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [recipe, setRecipe] = useState<RecipeTypes | null>(null)

    const recipeOfTheDay = async () => {
        try {
            setLoading(true)
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
            setRecipe(response.data.meals[0]) 
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        recipeOfTheDay()
    }, [])

    if (loading) {
        return <SkeletonLoader />
    }

    if (!recipe) {
        return <div className="flex justify-center items-center h-screen">Failed to load recipe</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white  overflow-hidden">
                <img 
                    className="w-full h-64 object-cover lg:h-[80%]" 
                    src={recipe.strMealThumb} 
                    alt={recipe.strMeal}
                /> 

                <div className="flex flex-col justify-center items-center"> 
                    <h2 className=" bg-black   text-white p-1 px-3  mb-4">Recipe Of The Day</h2>
                    <h1 className="text-4xl font-bold mb-4">{recipe.strMeal}</h1>
                    <p className="text-gray-700 leading-relaxed">
                        {recipe.strInstructions.length > 300 
                            ? `${recipe.strInstructions.substring(0, 300)}...` 
                            : recipe.strInstructions}
                    </p>
                </div> 
            </div> 
        </div>
    )
}

export default Home