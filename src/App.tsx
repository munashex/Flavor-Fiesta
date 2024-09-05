import Home from './Pages/Home' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'


function App() {
  return (
    <Router>
       <Navbar/>
    <div className='mx-3 lg:mx-9'>
    <Routes>
      <Route path="/" element={<Home/>}/>  
      </Routes> 
      </div>
  </Router>
  )
}

export default App