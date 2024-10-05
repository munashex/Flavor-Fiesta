import links from "../data/links" 
import Logo from '../images/Logo.png' 
import {Link} from 'react-router-dom'


const Footer = () => {

    return (
        <div className="px-3 mt-24 lg:px-9 border-t border-state-300 py-8 flex flex-col md:flex-row items-center gap-x-5 justify-center lg:justify-between">
        <img src={Logo} className="md:w-48 w-36"/>

        <div className="flex flex-row  flex-wrap gap-3">
          {links.map((li) => (
            <Link key={li.name} to={li.link}>{li.name}</Link>
          ))}
        </div>
        </div>
    )
}

export default Footer