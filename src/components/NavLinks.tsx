import links from '../data/links';
import { Link } from 'react-router-dom';

interface NavLinksProps {
  onClick: () => void;
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  return (
    <div className={`w-full h-screen`}>
      <div className="flex flex-col gap-1 mt-11 animate-fade-right">
        {links.map((link) => (
          <Link  onClick={onClick}  to={`${link.link}`} className="text-xl md:text-2xl lg:text-5xl font-unbounded">
          {link.name} 
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;


