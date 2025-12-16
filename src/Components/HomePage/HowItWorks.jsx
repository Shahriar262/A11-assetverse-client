import { FaBox, FaClipboard, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaBox />,
    title: "HR Adds Assets",
    description: "HR uploads company assets with all relevant details into AssetVerse.",
  },
  {
    icon: <FaClipboard />,
    title: "Employee Requests",
    description: "Employees browse available assets and submit requests for approval.",
  },
  {
    icon: <FaCheckCircle />,
    title: "HR Approves",
    description: "HR reviews requests, approves them, and assigns assets accordingly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false,  amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:translate-y-2"
            >
              <div className="text-indigo-600 text-4xl mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
