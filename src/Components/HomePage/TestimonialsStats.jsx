import { motion } from "framer-motion";

const TestimonialsStats = () => {
  const stats = [
    { value: "100+", label: "Companies" },
    { value: "5K+", label: "Assets Managed" },
    { value: "10K+", label: "Employees Served" },
  ];

  return (
    <section className="bg-indigo-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          Trusted by Growing Companies
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-6"
            >
              <p className="text-4xl font-bold">{stat.value}</p>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStats;
