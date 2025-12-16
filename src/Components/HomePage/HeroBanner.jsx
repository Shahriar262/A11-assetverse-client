import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[28px] sm:text-4xl font-bold text-gray-900 leading-tight">
            Smart Asset Management for Growing Companies
          </h1>

          <p className="mt-4 text-gray-600 max-w-md text-[14px] md:text-base">
            AssetVerse helps organizations track, manage and assign assets with
            complete transparency and control.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/register-hr"
                className="btn bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/login"
                className="btn btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Login
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.img
          src="https://res.cloudinary.com/dtxtatusv/image/upload/v1765906851/ai-enhances-financial-asset-management-600nw-2659283391_z6sle3.jpg"
          alt="Asset Management"
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="rounded-xl shadow-md w-full"
        />
      </div>
    </section>
  );
};

export default HeroBanner;
