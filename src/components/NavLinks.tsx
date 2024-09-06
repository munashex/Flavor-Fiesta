import links from '../data/links';
import { Link } from 'react-router-dom';

interface NavLinksProps {
  onClick: () => void;
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  return (
    <div className="w-full">
      {/* Links on small and medium screens */}
      <div className="flex flex-col lg:flex-row gap-4 justify-center lg:gap-6 text-lg items-center divide-y-2 lg:divide-y-0 divide-slate-400 w-full h-full p-6">
        {links.map((l) => (
          <Link
            key={l.name}
            to={`${l.link}`}
            onClick={onClick}
            className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
          >
            {l.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;


