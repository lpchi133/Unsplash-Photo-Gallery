import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode; // Specify that children can be any ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-300 text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md py-3 z-50 border-b border-gray-200">
        <div className="w-full px-8 lg:px-16 flex justify-between ">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-black hover:text-gray-700 transition duration-300"
          >
            Unsplash Photo Gallery
          </Link>
          {/* Navigation Links */}
          <nav className="flex space-x-4 sm:space-x-6 text-lg">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-500 transition duration-300"
            >
              Home
            </Link>
            <span className="text-gray-600 hover:text-indigo-500 transition duration-300">
              About
            </span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full pt-16 px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-700 text-gray-200 py-4">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          {/* Footer Logo */}
          <div>
            <Link to="/" className="text-xl font-semibold text-white hover:text-indigo-400 transition duration-300">
              Unsplash Photo Gallery
            </Link>
          </div>
          {/* Footer Copyright */}
          <div className="text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} UnsplashPhotoGallery
          </div>
        </div>
      </footer>
    </div>
  );
};