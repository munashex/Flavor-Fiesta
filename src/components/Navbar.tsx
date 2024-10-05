import Logo from '../images/Logo.png'
import { CiSearch } from "react-icons/ci"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavLinks from './NavLinks'

const Navbar = () => {
     const [search, setSearch] = useState('')  
     const navigate = useNavigate() 
     const [openSearch, setOpenSearch] = useState(false)
     const [openLinks, setOpenLinks] = useState(false) 

     const handleOpenLinks = () => setOpenLinks(!openLinks)


    const handleOpenSearch = () => setOpenSearch(!openSearch)

     const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(search.length > 1) {
            navigate(`/search/${search}`)
        }
     }

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      };

    

    return (
        <div className="mx-3 lg:mx-9 my-3">
            {/* Navbar on sm and md screens */}
            <div className="flex lg:hidden flex-row justify-between items-center"> 
                <Link to="/">
                <img src={Logo} className="w-52 md:w-64" alt="food fiesta" /> 
                </Link>
                <button onClick={handleOpenSearch}>
                    <CiSearch size={28} />
                </button>
                <button onClick={handleOpenLinks} className="font-unbounded border border-black py-1 px-2 rounded-full bg-black text-white">
                  {openLinks ? <span className="animate-fade-right">Close</span> : <span className="animate-fade-left">Menu</span>}
                </button>
            </div>

            {/* Navbar on lg screens */}
            <div className="hidden lg:flex flex-row items-center justify-around">
                <Link to="/">
                <img src={Logo} className="w-64" alt="food fiesta" />
                </Link>
                <form onSubmit={handleSubmitSearch} className="relative">
                    <input 
                        type="text" 
                        className="border p-2.5 px-16 rounded-md outline-none" 
                        placeholder="What do you want to cook today?" 
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="absolute top-2 left-3">
                        <CiSearch size={25} />
                    </button>
                </form>

                <button className="bg-black text-white font-unbounded text-lg py-1 px-6 rounded-full" onClick={handleOpenLinks}>
                {openLinks ? <span className="animate-fade-right">Close</span> : <span className="animate-fade-left">Menu</span>}
                </button>
            </div>

            {/* Search text input on sm & md screen */}
            <div className="flex w-full lg:hidden">
                {openSearch && (
                    <form onSubmit={handleSubmitSearch} className="relative w-full mt-3 border-t">
                        <input
                            type="text"
                            className="w-full p-3 pl-11 outline-none placeholder:pl-11 placeholder:font-semibold"
                            placeholder="What do you want to cook today?" 
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="absolute left-5 top-1/2 transform -translate-y-1/2">
                            <CiSearch className="w-6 h-6" />
                        </button>
                    </form>
                )}
            </div>

             {/* open or close navlinks menu */}
            {openLinks ?  <NavLinks onClick={handleOpenLinks}/> : null}
        </div>
    )
}

export default Navbar