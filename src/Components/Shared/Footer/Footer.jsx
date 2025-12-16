import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router";


const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-500 mb-3">
            AssetVerse
          </h2>
          <p className="text-sm leading-relaxed">
            A smart corporate asset management system helping companies track,
            assign, and manage organizational assets efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-indigo-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-indigo-400 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-indigo-400 transition">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register-employee"
                className="hover:text-indigo-400 transition"
              >
                Join as Employee
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-white mb-4">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>
              Email:{" "}
              <span className="text-indigo-400">support@assetverse.com</span>
            </li>
            <li>Phone: +880 1234-567890</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full border border-slate-700 hover:bg-indigo-600 hover:border-indigo-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded-full border border-slate-700 hover:bg-indigo-600 hover:border-indigo-600 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="p-2 rounded-full border border-slate-700 hover:bg-indigo-600 hover:border-indigo-600 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm py-4 border-t border-slate-800">
        © {new Date().getFullYear()}{" "}
        <span className="text-indigo-400 font-medium">AssetVerse</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
