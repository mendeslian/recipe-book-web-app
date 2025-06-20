import { ChefHat, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white ">
      <div className="flex items-center justify-center px-4 py-8 h-50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2">
            <ChefHat className="text-orange-500" size={24} />
            <span className="text-xl font-semibold">Recipe Finder</span>
          </div>

          <div className="flex items-center gap-1 text-md text-neutral-300">
            <span>Made with</span>
            <Heart className="text-red-500 fill-current" size={16} />
            <span>for food lovers</span>
          </div>

          <div className="text-center text-md text-neutral-400">
            <p>&copy; 2025 Recipe Finder. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
