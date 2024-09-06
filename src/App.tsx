import Home from './Pages/Home' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar' 
import Recipe from './Pages/Recipe'
import Category from './Pages/Category'
import Searched from './Pages/Searched'


function App() {
  return (
    <Router>
       <Navbar/>
    <div className='mx-3 my-8 lg:mx-9 lg:p-6'>
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/recipe/:id" element={<Recipe/>}/>  
      <Route path="/category/:id" element={<Category/>}/> 
      <Route path="/search/:id" element={<Searched/>}/>
      </Routes> 
      </div>
  </Router>
  )
}

export default App
