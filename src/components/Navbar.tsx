import Logo from '../images/Logo.png'
import { CiSearch } from "react-icons/ci"
import { FaBars } from "react-icons/fa"
import { useState } from 'react'

const Navbar = () => {
    // const [search, setSearch] = useState('')
    const [openSearch, setOpenSearch] = useState(false)

    const handleOpenSearch = () => setOpenSearch(!openSearch)

    return (
        <div className="mx-3 lg:mx-9 my-3">
            {/* Navbar on sm and md screens */}
            <div className="flex lg:hidden flex-row justify-between items-center">
                <img src={Logo} className="w-52 md:w-64" alt="food fiesta" />
                <button onClick={handleOpenSearch}>
                    <CiSearch size={28} />
                </button>
                <button>
                    <FaBars size={28} />
                </button>
            </div>

            {/* Navbar on lg screens */}
            <div className="hidden lg:flex flex-row items-center justify-around">
                <img src={Logo} className="w-64" alt="food fiesta" />
                
                <div className="relative">
                    <input 
                        type="text" 
                        className="border p-2.5 px-16 rounded-md outline-none" 
                        placeholder="What do you want to cook today?"
                    />
                    <span className="absolute top-2 left-3">
                        <CiSearch size={25} />
                    </span>
                </div>

                <button className="inline-flex items-center gap-1">
                    <FaBars size={28} />
                    <span className="text-lg">Menu</span>
                </button>
            </div>

            {/* Search text input on sm & md screen */}
            <div className="flex w-full lg:hidden">
                {openSearch && (
                    <div className="relative w-full mt-3 border-t">
                        <input
                            type="text"
                            className="w-full p-3 pl-11 outline-none placeholder:pl-11 placeholder:font-semibold"
                            placeholder="What do you want to cook today?"
                        />
                        <span className="absolute left-5 top-1/2 transform -translate-y-1/2">
                            <CiSearch className="w-6 h-6" />
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar