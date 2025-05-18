import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <p className="text-gray-300 max-w-md">
              Building amazing web experiences with modern technologies and
              creative solutions
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub size={28} className="hover:text-blue-400" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={28} className="hover:text-blue-400" />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter size={28} className="hover:text-blue-400" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
              aria-label="Email"
            >
              <FaEnvelope size={28} className="hover:text-blue-400" />
            </a>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Your Name. All rights reserved.
            <span className="inline-block ml-2 bg-blue-500 h-1.5 w-1.5 rounded-full animate-pulse"></span>
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 relative group"
            >
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 relative group"
            >
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/sitemap"
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300 relative group"
            >
              Sitemap
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
