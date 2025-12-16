import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaShieldAlt, FaClock } from "react-icons/fa";

const AboutSection = () => {
  const benefits = [
    { icon: <FaChartLine />, text: "Centralized asset tracking" },
    { icon: <FaUsers />, text: "Efficient employee management" },
    { icon: <FaShieldAlt />, text: "Secure role-based access" },
    { icon: <FaClock />, text: "Time-saving approval workflow" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Choose AssetVerse?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-6 border rounded-lg text-center cursor-pointer  hover:-translate-y-2 hover:shadow-lg hover:bg-indigo-50"
            >
              <div className="text-indigo-600 text-3xl mb-3 flex justify-center items-center">
                {b.icon}
              </div>
              <p>{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
